// Local backend compatibility layer.
// Exposes the subset of the supabase-js API used by this site, backed by the
// app's own FastAPI + MongoDB backend (REACT_APP_BACKEND_URL + /api).
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export interface User {
  id: string;
  email?: string;
  user_metadata?: Record<string, any>;
  [key: string]: any;
}

interface Session {
  access_token: string;
  user: User;
}

const TOKEN_KEY = "sb_local_token";
const USER_KEY = "sb_local_user";

function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function getCachedUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function currentSession(): Session | null {
  const token = getToken();
  if (!token) return null;
  const user = getCachedUser();
  return { access_token: token, user: user ?? { id: "" } };
}

type AuthListener = (event: string, session: Session | null) => void;
const listeners = new Set<AuthListener>();

function notifyAuth(event: string) {
  const session = currentSession();
  listeners.forEach((cb) => {
    try {
      cb(event, session);
    } catch {
      /* noop */
    }
  });
}

function authHeaders(extra: Record<string, string> = {}): Record<string, string> {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${API}${path}`, {
    ...init,
    headers: { ...authHeaders(), ...(init.headers as Record<string, string> | undefined) },
  });
}

const auth = {
  async getSession() {
    return { data: { session: currentSession() }, error: null };
  },

  async getUser() {
    const token = getToken();
    if (!token) return { data: { user: null }, error: null };
    try {
      const res = await apiFetch("/auth/user");
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
        }
        return { data: { user: null }, error: null };
      }
      const user = (await res.json()) as User;
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return { data: { user }, error: null };
    } catch {
      return { data: { user: getCachedUser() }, error: null };
    }
  },

  onAuthStateChange(callback: AuthListener) {
    listeners.add(callback);
    // Mirror supabase-js: fire an initial event on subscribe.
    setTimeout(() => callback("INITIAL_SESSION", currentSession()), 0);
    return {
      data: {
        subscription: {
          unsubscribe: () => listeners.delete(callback),
        },
      },
    };
  },

  async signInWithPassword({ email, password }: { email: string; password: string }) {
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        return { data: { user: null, session: null }, error: { message: body.detail || body.error || "Invalid login credentials" } };
      }
      const body = await res.json();
      localStorage.setItem(TOKEN_KEY, body.access_token);
      localStorage.setItem(USER_KEY, JSON.stringify(body.user));
      notifyAuth("SIGNED_IN");
      return { data: { user: body.user as User, session: currentSession() }, error: null };
    } catch (e: any) {
      return { data: { user: null, session: null }, error: { message: e?.message || "Network error" } };
    }
  },

  async signOut(_opts?: { scope?: string }) {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      /* noop */
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    notifyAuth("SIGNED_OUT");
    return { error: null };
  },

  async updateUser(attrs: { password?: string; current_password?: string }) {
    // Password-reset flow: no session, token arrives via /reset-password?token=...
    const token = getToken();
    if (!token) {
      const urlToken = new URLSearchParams(window.location.search).get("token");
      if (!urlToken) return { data: { user: null }, error: { message: "Invalid or expired link" } };
      const res = await apiFetch("/auth/reset-confirm", {
        method: "POST",
        body: JSON.stringify({ token: urlToken, password: attrs.password }),
      });
      if (!res.ok) return { data: { user: null }, error: { message: "Invalid or expired link" } };
      const body = await res.json();
      localStorage.setItem(TOKEN_KEY, body.access_token);
      localStorage.setItem(USER_KEY, JSON.stringify(body.user));
      notifyAuth("SIGNED_IN");
      return { data: { user: body.user as User }, error: null };
    }
    const res = await apiFetch("/auth/update", {
      method: "POST",
      body: JSON.stringify({ password: attrs.password, current_password: attrs.current_password }),
    });
    if (!res.ok) return { data: { user: null }, error: { message: "Could not update password" } };
    return { data: { user: getCachedUser() }, error: null };
  },

  async resetPasswordForEmail(email: string, _opts?: { redirectTo?: string }) {
    try {
      await apiFetch("/auth/reset-request", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      return { data: {}, error: null };
    } catch (e: any) {
      return { data: {}, error: { message: e?.message || "Network error" } };
    }
  },
};

const functions = {
  async invoke(name: string, opts: { body?: unknown } = {}) {
    try {
      const res = await apiFetch(`/functions/${name}`, {
        method: "POST",
        body: JSON.stringify(opts.body ?? {}),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        return {
          data: body,
          error: {
            message: body?.error || body?.detail || `Edge Function returned ${res.status}`,
            context: { json: async () => body },
          },
        };
      }
      return { data: body, error: null };
    } catch (e: any) {
      return { data: null, error: { message: e?.message || "Network error", context: { json: async () => null } } };
    }
  },
};

type Filter = { col: string; op: string; val: any };

class QueryBuilder {
  private table: string;
  private filters: Filter[] = [];
  private selectCols = "*";
  private method: "GET" | "POST" | "PATCH" | "DELETE" | null = null;
  private payload: any = null;
  private orderBy: { col: string; asc: boolean } | null = null;
  private limitN: number | null = null;
  private singleMode: "single" | "maybe" | null = null;

  constructor(table: string) {
    this.table = table;
  }

  select(cols = "*") {
    this.selectCols = cols || "*";
    if (!this.method) this.method = "GET";
    return this;
  }
  insert(rows: any) {
    this.method = "POST";
    this.payload = rows;
    return this;
  }
  update(obj: any) {
    this.method = "PATCH";
    this.payload = obj;
    return this;
  }
  upsert(obj: any) {
    this.method = "POST";
    this.payload = obj;
    return this;
  }
  delete() {
    this.method = "DELETE";
    return this;
  }
  eq(col: string, val: any) {
    this.filters.push({ col, op: "eq", val });
    return this;
  }
  gte(col: string, val: any) {
    this.filters.push({ col, op: "gte", val });
    return this;
  }
  in(col: string, vals: any[]) {
    this.filters.push({ col, op: "in", val: vals });
    return this;
  }
  order(col: string, opts: { ascending?: boolean } = {}) {
    this.orderBy = { col, asc: opts.ascending !== false };
    return this;
  }
  limit(n: number) {
    this.limitN = n;
    return this;
  }
  single() {
    this.singleMode = "single";
    return this.execute();
  }
  maybeSingle() {
    this.singleMode = "maybe";
    return this.execute();
  }

  private buildQuery(): string {
    const params = new URLSearchParams();
    params.set("select", this.selectCols);
    for (const f of this.filters) {
      const v = f.op === "in" ? `in.(${f.val.join(",")})` : `${f.op}.${f.val}`;
      params.append(f.col, v);
    }
    if (this.orderBy) params.set("order", `${this.orderBy.col}.${this.orderBy.asc ? "asc" : "desc"}`);
    if (this.limitN != null) params.set("limit", String(this.limitN));
    return params.toString();
  }

  private async execute(): Promise<{ data: any; error: any }> {
    const method = this.method ?? "GET";
    const qs = this.buildQuery();
    const url = `/rest/${this.table}${qs ? `?${qs}` : ""}`;
    try {
      const res = await apiFetch(url, {
        method,
        ...(method === "POST" || method === "PATCH" ? { body: JSON.stringify(this.payload) } : {}),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        return { data: null, error: { message: body?.detail || body?.error || `Request failed (${res.status})` } };
      }
      if (this.singleMode) {
        const row = Array.isArray(body) ? body[0] ?? null : body;
        if (!row && this.singleMode === "single") {
          return { data: null, error: { message: "Row not found" } };
        }
        return { data: row, error: null };
      }
      return { data: body, error: null };
    } catch (e: any) {
      return { data: null, error: { message: e?.message || "Network error" } };
    }
  }

  then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: { data: any; error: any }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ) {
    return this.execute().then(onfulfilled, onrejected);
  }
}

const storage = {
  from(bucket: string) {
    return {
      async upload(path: string, file: File | Blob, opts: { contentType?: string } = {}) {
        try {
          const form = new FormData();
          form.append("file", file, (file as File).name || "file");
          const res = await fetch(`${API}/storage/upload?bucket=${encodeURIComponent(bucket)}&path=${encodeURIComponent(path)}`, {
            method: "POST",
            headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : {},
            body: form,
          });
          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            return { data: null, error: { message: body?.detail || body?.error || `Upload failed (${res.status})` } };
          }
          return { data: { path }, error: null };
        } catch (e: any) {
          return { data: null, error: { message: e?.message || "Network error" } };
        }
      },
      async createSignedUrl(path: string, expiresIn = 300) {
        try {
          const res = await apiFetch("/storage/sign", {
            method: "POST",
            body: JSON.stringify({ bucket, path, expires_in: expiresIn }),
          });
          if (!res.ok) return { data: null, error: { message: `Sign failed (${res.status})` } };
          const body = await res.json();
          return { data: { signedUrl: body.signedUrl }, error: null };
        } catch (e: any) {
          return { data: null, error: { message: e?.message || "Network error" } };
        }
      },
    };
  },
};

export const supabase = { auth, functions, from: (table: string) => new QueryBuilder(table), storage };
