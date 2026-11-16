import { supabase } from "@/integrations/supabase/client";
import { lang } from "@/i18n";

export async function loadPanel() {
  const { data: u } = await supabase.auth.getUser();
  const userId = u.user?.id;
  if (!userId) return null;
  const [perfil, caso, act, docs] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase.from("casos").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("caso_actualizaciones").select("*").eq("user_id", userId).order("fecha", { ascending: false }),
    supabase.from("caso_documentos").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
  ]);
  return { userId, email: u.user?.email ?? "", perfil: perfil.data as any, caso: caso.data as any, actualizaciones: act.data ?? [], documentos: docs.data ?? [] };
}

/** DD.MM.YYYY */
export function dateFmt(v?: string | null) {
  if (!v) return "—";
  const d = new Date(v);
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}
export const isEn = () => lang === "en";
