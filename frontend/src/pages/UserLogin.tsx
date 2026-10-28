import { t as _t } from "@/i18n";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error(_t("Anmeldung fehlgeschlagen: ") + error.message);
      return;
    }

    // Check if user has admin role -> redirect to admin
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .single();

    if (roleData?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <Helmet>
        <title>{_t("Anmelden – Blockscaner Rückgewinnungsdienst")}</title>
        <meta name="description" content="Melden Sie sich in Ihrem Konto an, um Ihr Krypto-Guthaben einzusehen und Auszahlungen zu verwalten." />
        <link rel="canonical" href="https://blockchain-24.com/login" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="w-full max-w-md rounded-2xl bg-card border border-border p-8 glow-border">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
            <LogIn className="h-4 w-4" />
            {_t("Konto-Anmeldung")}
          </div>
          <h1 className="text-2xl font-display font-bold">{_t("Anmelden")}</h1>
          <p className="text-muted-foreground text-sm mt-2">
            {_t("Melden Sie sich an, um Ihr Guthaben einzusehen und Auszahlungen zu verwalten.")}
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{_t("E-Mail")}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-secondary border-border"
              placeholder={_t("ihre@email.de")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{_t("Passwort")}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-secondary border-border"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            <LogIn className="mr-2 h-4 w-4" />
            {loading ? _t("Wird angemeldet...") : _t("Anmelden")}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            {_t("Zurück zur Startseite")}
          </Link>
        </div>
      </main>
    </div>
  );
};

export default UserLogin;
