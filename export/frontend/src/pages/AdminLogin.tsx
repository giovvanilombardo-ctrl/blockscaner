import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, LogIn } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error("Login fehlgeschlagen: " + error.message);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border p-8 glow-border">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
            <Shield className="h-4 w-4" />
            Admin
          </div>
          <h1 className="text-2xl font-display font-bold">Admin-Anmeldung</h1>
          <p className="text-muted-foreground text-sm mt-2">Melden Sie sich an, um die Leads zu verwalten.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-secondary border-border" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            <LogIn className="mr-2 h-4 w-4" />
            {loading ? "Wird angemeldet..." : "Anmelden"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
