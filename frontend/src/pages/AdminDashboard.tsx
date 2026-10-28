import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Shield, LogOut, Search, Trash2, RefreshCw, UserPlus, Wallet, Users,
  ArrowDownToLine, CheckCircle2, XCircle, Building2, TrendingUp, FileText,
  Clock, Mail, MousePointerClick, Eye,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  incident_date: string | null;
  balances: { currency: string; balance: number }[];
  role: string;
  bank_details?: {
    bank_name: string | null;
    iban: string | null;
    bic: string | null;
    account_holder: string | null;
  } | null;
}

interface WithdrawalRequest {
  id: string;
  user_id: string;
  from_currency: string;
  amount: number;
  eur_amount: number | null;
  status: string;
  created_at: string;
  user_email?: string;
  user_name?: string;
}

interface EmailTrackingEvent {
  id: string;
  email: string;
  event_type: string;
  link_url: string | null;
  created_at: string;
  session_id: string | null;
}

type TabType = "overview" | "users" | "leads" | "withdrawals" | "tracking";

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [trackingEvents, setTrackingEvents] = useState<EmailTrackingEvent[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // New user form
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newIncidentDate, setNewIncidentDate] = useState("");
  const [newInitialBalance, setNewInitialBalance] = useState("");
  const [newInitialCurrency, setNewInitialCurrency] = useState("BTC");
  const [creating, setCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Balance form
  const [balCurrency, setBalCurrency] = useState("BTC");
  const [balAmount, setBalAmount] = useState("");
  const [updatingBalance, setUpdatingBalance] = useState(false);
  const [editIncidentDate, setEditIncidentDate] = useState("");
  const [updatingIncidentDate, setUpdatingIncidentDate] = useState(false);

  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [processingWithdrawalId, setProcessingWithdrawalId] = useState<string | null>(null);
  const [rejectConfirm, setRejectConfirm] = useState<WithdrawalRequest | null>(null);

  const navigate = useNavigate();

  const invokeAdmin = async (body: Record<string, any>) => {
    try {
      const { data, error } = await supabase.functions.invoke("admin-manage-users", { body });
      if (error) {
        let msg = "Request failed";
        try {
          const ctx = await (error as any).context?.json?.();
          msg = ctx?.error || error.message || msg;
        } catch {
          msg = error.message || msg;
        }
        return { data: null, errorMsg: msg };
      }
      if (data?.error) {
        return { data: null, errorMsg: data.error };
      }
      return { data, errorMsg: null };
    } catch (err: any) {
      return { data: null, errorMsg: err.message || "Request failed" };
    }
  };

  const formatDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const parseDateInput = (raw: string): Date | null => {
    const value = raw.trim();
    if (!value) return null;

    const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const de = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

    const year = iso ? Number(iso[1]) : de ? Number(de[3]) : NaN;
    const month = iso ? Number(iso[2]) : de ? Number(de[2]) : NaN;
    const day = iso ? Number(iso[3]) : de ? Number(de[1]) : NaN;

    if (!year || !month || !day) return null;

    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
    }

    return date;
  };

  const normalizeIncidentDateForDb = (raw: string): { value: string | null; error: string | null } => {
    if (!raw.trim()) return { value: null, error: null };

    const parsed = parseDateInput(raw);
    if (!parsed) {
      return { value: null, error: "Bitte Datum im Format JJJJ-MM-TT oder TT.MM.JJJJ eingeben." };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (parsed > today) {
      return { value: null, error: "Incident Date darf nicht in der Zukunft liegen." };
    }

    return { value: formatDateString(parsed), error: null };
  };

  const formatIncidentDateForDisplay = (value: string | null): string => {
    if (!value) return "Not set";
    const parsed = parseDateInput(value);
    return parsed ? parsed.toLocaleDateString("de-DE") : value;
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-manage-users", {
        body: { action: "list_users" },
      });

      if (error) {
        toast.error("Failed to load users");
        console.error("Edge function error:", error);
      } else if (data?.error) {
        toast.error("Failed to load users: " + data.error);
        console.error("Function returned error:", data.error);
      } else {
        const profiles = data?.profiles || [];
        const balances = data?.balances || [];
        const roles = data?.roles || [];
        const bankDetails = data?.bankDetails || [];

        const mapped: UserProfile[] = profiles.map((p: any) => ({
          ...p,
          balances: balances
            .filter((b: any) => b.user_id === p.id)
            .map((b: any) => ({ currency: b.currency, balance: Number(b.balance) })),
          role: roles.find((r: any) => r.user_id === p.id)?.role || "user",
          bank_details: bankDetails.find((bd: any) => bd.user_id === p.id) || null,
        }));

        setUsers(mapped);
      }
    } catch (err) {
      console.error("Fetch users error:", err);
      toast.error("Failed to load users");
    }
    setLoading(false);
  }, []);

  const fetchLeads = useCallback(async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads(data || []);
  }, []);

  const fetchTracking = useCallback(async () => {
    const { data } = await supabase
      .from("email_tracking")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    setTrackingEvents((data as EmailTrackingEvent[]) || []);
  }, []);

  const fetchWithdrawals = useCallback(async () => {
    const { data } = await supabase
      .from("withdrawal_requests")
      .select("*")
      .order("created_at", { ascending: false });

    setWithdrawals(data?.map((w) => ({ ...w, eur_amount: w.eur_amount ?? 0 })) || []);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/admin/login");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/login");
      } else {
        fetchUsers();
        fetchLeads();
        fetchWithdrawals();
        fetchTracking();
      }
    });

    return () => { subscription.unsubscribe(); };
  }, [navigate, fetchUsers, fetchLeads, fetchWithdrawals, fetchTracking]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleCreateUser = async () => {
    if (!newEmail || !newPassword || !newName) {
      toast.error("Please fill in all fields");
      return;
    }

    const normalizedIncidentDate = normalizeIncidentDateForDb(newIncidentDate);
    if (normalizedIncidentDate.error) {
      toast.error(normalizedIncidentDate.error);
      return;
    }

    setCreating(true);

    const { data, errorMsg } = await invokeAdmin({
      action: "create_user", email: newEmail, password: newPassword, full_name: newName, incident_date: normalizedIncidentDate.value, initial_balance: newInitialBalance ? parseFloat(newInitialBalance) : null, initial_currency: newInitialCurrency,
    });

    setCreating(false);
    if (errorMsg) {
      toast.error(errorMsg);
    } else {
      toast.success(data?.existedAlready ? "User already existed and was linked" : "User created successfully");
      setNewEmail("");
      setNewPassword("");
      setNewName("");
      setNewIncidentDate("");
      setNewInitialBalance("");
      setNewInitialCurrency("BTC");
      setDialogOpen(false);
      fetchUsers();
    }
  };

  const handleUpdateBalance = async () => {
    if (!selectedUser || !balAmount) return;
    setUpdatingBalance(true);

    const { errorMsg } = await invokeAdmin({
      action: "update_balance",
      user_id: selectedUser.id,
      currency: balCurrency,
      balance: parseFloat(balAmount),
    });

    setUpdatingBalance(false);
    if (errorMsg) {
      toast.error(errorMsg);
    } else {
      toast.success(`Balance updated: ${balAmount} ${balCurrency}`);
      setBalAmount("");
      fetchUsers();
    }
  };

  const handleUpdateIncidentDate = async () => {
    if (!selectedUser) return;

    const normalizedIncidentDate = normalizeIncidentDateForDb(editIncidentDate);
    if (normalizedIncidentDate.error) {
      toast.error(normalizedIncidentDate.error);
      return;
    }

    setUpdatingIncidentDate(true);
    const { errorMsg } = await invokeAdmin({
      action: "update_incident_date",
      user_id: selectedUser.id,
      incident_date: normalizedIncidentDate.value,
    });
    setUpdatingIncidentDate(false);
    if (errorMsg) {
      toast.error(errorMsg);
    } else {
      toast.success("Incident date updated");
      fetchUsers();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const { errorMsg } = await invokeAdmin({ action: "delete_user", user_id: userId });

    if (errorMsg) {
      toast.error(errorMsg);
    } else {
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      if (selectedUser?.id === userId) setSelectedUser(null);
    }
  };

  const handleDeleteLead = async (id: string) => {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete lead");
    } else {
      toast.success("Lead deleted");
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
    }
  };

  const handleWithdrawalAction = async (id: string, newStatus: "approved" | "rejected") => {
    if (processingWithdrawalId) return;
    setProcessingWithdrawalId(id);
    try {
      const { errorMsg } = await invokeAdmin({
        action: "handle_withdrawal",
        withdrawal_id: id,
        new_status: newStatus,
      });

      if (errorMsg) {
        toast.error("Failed to update withdrawal: " + errorMsg);
      } else {
        toast.success(`Withdrawal ${newStatus === "approved" ? "approved" : "rejected"}`);
        fetchWithdrawals();
        fetchUsers();
      }
    } finally {
      setProcessingWithdrawalId(null);
    }
  };

  const nonAdminUsers = users.filter((u) => u.role !== "admin");

  const filteredUsers = nonAdminUsers.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.email || "").toLowerCase().includes(q) ||
      (u.full_name || "").toLowerCase().includes(q)
    );
  });

  const filteredLeads = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.vorname.toLowerCase().includes(q) ||
      l.nachname.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q)
    );
  });

  const filteredWithdrawals = withdrawals.filter((w) => {
    const q = search.toLowerCase();
    const user = users.find((u) => u.id === w.user_id);
    return (
      (user?.email || "").toLowerCase().includes(q) ||
      (user?.full_name || "").toLowerCase().includes(q) ||
      w.from_currency.toLowerCase().includes(q) ||
      w.status.toLowerCase().includes(q)
    );
  });

  const pendingWithdrawals = withdrawals.filter((w) => w.status === "pending" || w.status === "pending_fee");
  const totalEurPending = pendingWithdrawals.reduce((s, w) => s + (w.eur_amount || 0), 0);

  const statusBadge = (status: string) => {
    if (status === "approved") return <Badge className="bg-[hsl(var(--success))] text-primary-foreground">Approved</Badge>;
    if (status === "rejected") return <Badge variant="destructive">Rejected</Badge>;
    if (status === "pending_fee") return <Badge variant="secondary" className="border border-[hsl(var(--warning))] text-[hsl(var(--warning))]">Pending Fee</Badge>;
    return <Badge variant="secondary" className="border border-[hsl(var(--warning))] text-[hsl(var(--warning))]">Pending</Badge>;
  };

  const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Overview", icon: <TrendingUp className="mr-1 h-4 w-4" /> },
    { key: "users", label: "Users", icon: <Users className="mr-1 h-4 w-4" /> },
    { key: "leads", label: "Leads", icon: <FileText className="mr-1 h-4 w-4" /> },
    { key: "withdrawals", label: "Withdrawals", icon: <ArrowDownToLine className="mr-1 h-4 w-4" /> },
    { key: "tracking", label: "Email Tracking", icon: <Mail className="mr-1 h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-display font-bold">Admin Panel</span>
          </div>
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "default" : "ghost"}
                size="sm"
                onClick={() => { setActiveTab(tab.key); setSearch(""); setSelectedUser(null); setSelectedLead(null); }}
              >
                {tab.icon} {tab.label}
                {tab.key === "withdrawals" && pendingWithdrawals.length > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                    {pendingWithdrawals.length}
                  </span>
                )}
              </Button>
            ))}
            <div className="w-px h-6 bg-border mx-2" />
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* ======================== OVERVIEW ======================== */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glow-border cursor-pointer hover:bg-card/80 transition" onClick={() => setActiveTab("users")}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-3xl font-display font-bold">{nonAdminUsers.length}</p>
                    </div>
                    <Users className="h-10 w-10 text-primary opacity-60" />
                  </div>
                </CardContent>
              </Card>
              <Card className="glow-border cursor-pointer hover:bg-card/80 transition" onClick={() => setActiveTab("leads")}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Leads</p>
                      <p className="text-3xl font-display font-bold">{leads.length}</p>
                    </div>
                    <FileText className="h-10 w-10 text-accent opacity-60" />
                  </div>
                </CardContent>
              </Card>
              <Card className="glow-border cursor-pointer hover:bg-card/80 transition" onClick={() => setActiveTab("withdrawals")}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Withdrawals</p>
                      <p className="text-3xl font-display font-bold">{pendingWithdrawals.length}</p>
                    </div>
                    <Clock className="h-10 w-10 text-[hsl(var(--warning))] opacity-60" />
                  </div>
                </CardContent>
              </Card>
              <Card className="glow-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending EUR Value</p>
                      <p className="text-3xl font-display font-bold">
                        €{totalEurPending.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <TrendingUp className="h-10 w-10 text-[hsl(var(--success))] opacity-60" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent pending withdrawals */}
            {pendingWithdrawals.length > 0 && (
              <Card className="glow-border">
                <CardHeader>
                   <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[hsl(var(--warning))]" />
                    Pending Withdrawal Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingWithdrawals.slice(0, 5).map((w) => {
                      const user = users.find((u) => u.id === w.user_id);
                      return (
                        <div key={w.id} className="flex items-center justify-between rounded-lg bg-secondary/50 border border-border p-3">
                          <div>
                            <p className="font-medium text-sm">{user?.full_name || user?.email || "Unknown"}</p>
                            <p className="text-xs text-muted-foreground">
                              {w.from_currency === "EUR" ? `€${w.amount.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `${w.amount} ${w.from_currency}`} → €{(w.eur_amount || 0).toLocaleString("de-DE", { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <div className="flex gap-2">
                             <Button size="sm" variant="outline" className="text-[hsl(var(--success))] border-[hsl(var(--success))]" disabled={processingWithdrawalId === w.id} onClick={() => handleWithdrawalAction(w.id, "approved")}>
                              <CheckCircle2 className="mr-1 h-4 w-4" /> Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive border-destructive" disabled={processingWithdrawalId === w.id} onClick={() => setRejectConfirm(w)}>
                              <XCircle className="mr-1 h-4 w-4" /> Reject
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* ======================== USERS ======================== */}
        {activeTab === "users" && (
          <>
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary border-border" />
              </div>
              <Button variant="outline" size="icon" onClick={() => { fetchUsers(); fetchLeads(); fetchWithdrawals(); }} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button><UserPlus className="mr-2 h-4 w-4" /> Create User</Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader><DialogTitle>Create New User</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input value={newName} onChange={(e) => setNewName(e.target.value)} className="bg-secondary border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="bg-secondary border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-secondary border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label>Incident Date</Label>
                      <Input type="text" value={newIncidentDate} onChange={(e) => setNewIncidentDate(e.target.value)} placeholder="YYYY-MM-DD oder TT.MM.JJJJ" className="bg-secondary border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label>Initial Balance Currency</Label>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm"
                        value={newInitialCurrency}
                        onChange={(e) => setNewInitialCurrency(e.target.value)}
                      >
                        {["EUR", "BTC", "ETH", "USDT", "USDC", "BNB", "SOL", "XRP", "ADA", "DOT", "DOGE"].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Initial Balance</Label>
                      <Input type="number" step="any" placeholder="0.00" value={newInitialBalance} onChange={(e) => setNewInitialBalance(e.target.value)} className="bg-secondary border-border" />
                    </div>
                    <Button onClick={handleCreateUser} disabled={creating} className="w-full">
                      {creating ? "Creating..." : "Create User"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex gap-6">
              <div className="flex-1 rounded-xl bg-card border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
                            {loading ? "Loading..." : "No users found"}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((user) => (
                          <TableRow
                            key={user.id}
                            className={`cursor-pointer transition-colors ${selectedUser?.id === user.id ? "bg-primary/10" : "hover:bg-muted/50"}`}
                            onClick={() => { setSelectedUser(user); setEditIncidentDate(user.incident_date || ""); }}
                          >
                            <TableCell className="font-medium">{user.full_name}</TableCell>
                            <TableCell className="text-sm">{user.email}</TableCell>
                            <TableCell className="text-sm">
                              {user.balances.length > 0
                                ? user.balances.map((b) => b.currency === "EUR" ? `€${b.balance.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `${b.balance} ${b.currency}`).join(", ")
                                : "—"
                              }
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(user.created_at).toLocaleDateString("en-US")}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost" size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.id); }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* User Detail Panel */}
              {selectedUser && (
                <div className="w-96 shrink-0 space-y-4 sticky top-20 self-start">
                  <Card className="glow-border">
                    <CardHeader>
                      <CardTitle>{selectedUser.full_name}</CardTitle>
                      <CardDescription>{selectedUser.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Current Balances</p>
                        {selectedUser.balances.length > 0 ? (
                          <div className="space-y-1 mt-1">
                            {selectedUser.balances.map((b) => (
                              <div key={b.currency} className="flex justify-between text-sm">
                                <span>{b.currency}</span>
                                <span className="font-mono">{b.currency === "EUR" ? `€${b.balance.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : b.balance}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No balance</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Bank Details */}
                  <Card className="glow-border">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        Bank Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedUser.bank_details?.iban ? (
                        <div className="space-y-2 text-sm">
                          {[
                            ["Account Holder", selectedUser.bank_details.account_holder],
                            ["Bank", selectedUser.bank_details.bank_name],
                            ["IBAN", selectedUser.bank_details.iban],
                            ["BIC", selectedUser.bank_details.bic],
                          ].map(([label, value]) => (
                            <div key={label as string}>
                              <p className="text-xs text-muted-foreground">{label}</p>
                              <p className="font-mono">{value || "–"}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No bank details on file</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="glow-border">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-primary" />
                        Set Balance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label>Currency</Label>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm"
                          value={balCurrency}
                          onChange={(e) => setBalCurrency(e.target.value)}
                        >
                          {["EUR", "BTC", "ETH", "USDT", "USDC", "BNB", "SOL", "XRP", "ADA", "DOT", "DOGE"].map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Amount</Label>
                        <Input type="number" step="any" value={balAmount} onChange={(e) => setBalAmount(e.target.value)} className="bg-secondary border-border" placeholder="0.00" />
                      </div>
                      <Button onClick={handleUpdateBalance} disabled={updatingBalance} className="w-full">
                        {updatingBalance ? "Updating..." : "Update Balance"}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Incident Date */}
                  <Card className="glow-border">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        Incident Date
                      </CardTitle>
                      <CardDescription>
                        {formatIncidentDateForDisplay(selectedUser.incident_date)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label>Incident Date</Label>
                        <Input
                          type="text"
                          value={editIncidentDate}
                          onChange={(e) => setEditIncidentDate(e.target.value)}
                          placeholder="YYYY-MM-DD oder TT.MM.JJJJ"
                          className="bg-secondary border-border"
                        />
                      </div>
                      <Button onClick={handleUpdateIncidentDate} disabled={updatingIncidentDate} className="w-full">
                        {updatingIncidentDate ? "Updating..." : "Update Incident Date"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </>
        )}

        {/* ======================== LEADS ======================== */}
        {activeTab === "leads" && (
          <>
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary border-border" />
              </div>
              <Button variant="outline" size="icon" onClick={() => { fetchUsers(); fetchLeads(); fetchWithdrawals(); }} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>

            <div className="flex gap-6">
              <div className="flex-1 rounded-xl bg-card border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Fraud Type</TableHead>
                        <TableHead>Loss</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                            No leads found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredLeads.map((lead) => (
                          <TableRow
                            key={lead.id}
                            className={`cursor-pointer transition-colors ${selectedLead?.id === lead.id ? "bg-primary/10" : "hover:bg-muted/50"}`}
                            onClick={() => setSelectedLead(lead)}
                          >
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(lead.created_at).toLocaleDateString("en-US")}
                            </TableCell>
                            <TableCell className="font-medium">{lead.vorname} {lead.nachname}</TableCell>
                            <TableCell className="text-sm">{lead.email}</TableCell>
                            <TableCell className="text-sm">{lead.betrugsart}</TableCell>
                            <TableCell className="text-sm">{lead.verlorener_betrag}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost" size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={(e) => { e.stopPropagation(); handleDeleteLead(lead.id); }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {selectedLead && (
                <div className="w-96 shrink-0 rounded-xl bg-card border border-border p-6 glow-border sticky top-20 self-start">
                  <h3 className="font-display font-bold text-lg mb-4">
                    {selectedLead.vorname} {selectedLead.nachname}
                  </h3>
                  <div className="space-y-3 text-sm">
                     {[
                      ["Email", selectedLead.email],
                      ["Phone", selectedLead.telefon],
                      ["Fraud Type", selectedLead.betrugsart],
                      ["Cryptocurrency", selectedLead.kryptowaehrung],
                      ["Estimated Loss", selectedLead.verlorener_betrag],
                      ["When", selectedLead.wann],
                      ["Platform", selectedLead.plattform],
                      ["Wallet Address", selectedLead.wallet_adresse || "–"],
                      ["Police Report", selectedLead.polizeibericht],
                    ].map(([label, value]) => (
                      <div key={label as string}>
                        <p className="text-muted-foreground text-xs">{label}</p>
                        <p className="text-foreground">{value}</p>
                      </div>
                    ))}
                    <div>
                      <p className="text-muted-foreground text-xs">Description</p>
                      <p className="text-foreground whitespace-pre-wrap">{selectedLead.beschreibung}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ======================== WITHDRAWALS ======================== */}
        {activeTab === "withdrawals" && (
          <>
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search withdrawals..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary border-border" />
              </div>
              <Button variant="outline" size="icon" onClick={() => fetchWithdrawals()}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="rounded-xl bg-card border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>EUR Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-28">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWithdrawals.length === 0 ? (
                      <TableRow>
                         <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                          No withdrawal requests
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredWithdrawals.map((w) => {
                        const user = users.find((u) => u.id === w.user_id);
                        return (
                          <TableRow key={w.id}>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(w.created_at).toLocaleDateString("en-US")}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-sm">{user?.full_name || "Unknown"}</p>
                                <p className="text-xs text-muted-foreground">{user?.email}</p>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{w.from_currency === "EUR" ? `€${w.amount.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `${w.amount} ${w.from_currency}`}</TableCell>
                            <TableCell className="font-mono text-sm">
                              €{(w.eur_amount || 0).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell>{statusBadge(w.status)}</TableCell>
                            <TableCell>
                              {(w.status === "pending" || w.status === "pending_fee") && (
                                <div className="flex gap-1">
                                  <Button size="icon" variant="ghost" className="h-8 w-8 text-[hsl(var(--success))]" disabled={processingWithdrawalId === w.id} onClick={() => handleWithdrawalAction(w.id, "approved")}>
                                    <CheckCircle2 className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" disabled={processingWithdrawalId === w.id} onClick={() => setRejectConfirm(w)}>
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}

        {/* ======================== EMAIL TRACKING ======================== */}
        {activeTab === "tracking" && (
          <>
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary border-border" />
              </div>
              <Button variant="outline" size="icon" onClick={() => fetchTracking()}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Card className="glow-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Opens</p>
                      <p className="text-3xl font-display font-bold">
                        {trackingEvents.filter((e) => e.event_type === "open").length}
                      </p>
                    </div>
                    <Eye className="h-10 w-10 text-primary opacity-60" />
                  </div>
                </CardContent>
              </Card>
              <Card className="glow-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Clicks</p>
                      <p className="text-3xl font-display font-bold">
                        {trackingEvents.filter((e) => e.event_type === "click").length}
                      </p>
                    </div>
                    <MousePointerClick className="h-10 w-10 text-accent opacity-60" />
                  </div>
                </CardContent>
              </Card>
              <Card className="glow-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Unique Recipients</p>
                      <p className="text-3xl font-display font-bold">
                        {new Set(trackingEvents.map((e) => e.email)).size}
                      </p>
                    </div>
                    <Users className="h-10 w-10 text-[hsl(var(--success))] opacity-60" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-xl bg-card border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead>Session</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trackingEvents
                      .filter((e) => !search || e.email.toLowerCase().includes(search.toLowerCase()))
                      .length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
                          No tracking events yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      trackingEvents
                        .filter((e) => !search || e.email.toLowerCase().includes(search.toLowerCase()))
                        .map((event) => (
                          <TableRow key={event.id}>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(event.created_at).toLocaleString("de-DE")}
                            </TableCell>
                            <TableCell className="text-sm">{event.email}</TableCell>
                            <TableCell>
                              {event.event_type === "open" ? (
                                <Badge variant="secondary" className="border border-primary text-primary">
                                  <Eye className="mr-1 h-3 w-3" /> Open
                                </Badge>
                              ) : (
                                <Badge className="bg-accent text-accent-foreground">
                                  <MousePointerClick className="mr-1 h-3 w-3" /> Click
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                              {event.link_url ? decodeURIComponent(event.link_url) : "–"}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground font-mono">
                              {event.session_id ? event.session_id.slice(0, 8) + "…" : "–"}
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Reject Confirmation Dialog */}
      <Dialog open={!!rejectConfirm} onOpenChange={(open) => { if (!open) setRejectConfirm(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2">
              <XCircle className="h-5 w-5" /> Confirm Rejection
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this withdrawal? The amount will be restored to the user's balance.
            </DialogDescription>
          </DialogHeader>
          {rejectConfirm && (() => {
            const user = users.find((u) => u.id === rejectConfirm.user_id);
            return (
              <div className="space-y-3 py-2">
                <div className="rounded-lg bg-secondary/50 border border-border p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User</span>
                    <span className="font-medium">{user?.full_name || "Unknown"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-mono font-bold text-foreground">{rejectConfirm.from_currency === "EUR" ? `€${rejectConfirm.amount.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `${rejectConfirm.amount} ${rejectConfirm.from_currency}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">EUR Value</span>
                    <span className="font-mono">€{(rejectConfirm.eur_amount || 0).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID</span>
                    <span className="font-mono text-xs text-muted-foreground">{rejectConfirm.id.slice(0, 8)}…</span>
                  </div>
                </div>
              </div>
            );
          })()}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setRejectConfirm(null)}>Cancel</Button>
            <Button
              variant="destructive"
              disabled={processingWithdrawalId === rejectConfirm?.id}
              onClick={async () => {
                if (!rejectConfirm) return;
                await handleWithdrawalAction(rejectConfirm.id, "rejected");
                setRejectConfirm(null);
              }}
            >
              <XCircle className="mr-2 h-4 w-4" /> Reject Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
