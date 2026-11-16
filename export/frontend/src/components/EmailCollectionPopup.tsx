import { t as _t } from "@/i18n";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Mail, ArrowRight, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().trim().email(_t("Bitte geben Sie eine gültige E-Mail-Adresse ein.")).max(255);

interface EmailCollectionPopupProps {
  open: boolean;
  onClose: () => void;
}

const EmailCollectionPopup = ({ open, onClose }: EmailCollectionPopupProps) => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setSubmitting(true);
    try {
      // Store visitor email and trigger reminder
      const { error: fnError } = await supabase.functions.invoke("send-visitor-reminder", {
        body: { email: result.data },
      });

      if (fnError) {
        console.error("Reminder error:", fnError);
        // Still save locally and close — don't block UX
      }

      localStorage.setItem("visitor_email", result.data);
      localStorage.setItem("visitor_email_collected", "true");
      toast.success(_t("Vielen Dank! Wir melden uns bei Ihnen."));
      onClose();
    } catch (err) {
      console.error("Submit error:", err);
      toast.success(_t("Vielen Dank!"));
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("visitor_email_collected", "skipped");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleSkip()}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <div className="mx-auto rounded-full bg-primary/10 p-3 mb-2 w-fit">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center font-display text-xl">
            {_t("Bleiben Sie informiert")}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {_t("Hinterlassen Sie Ihre E-Mail-Adresse und wir senden Ihnen wichtige Informationen zur Rückgewinnung Ihrer Kryptowährungen.")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder={_t("ihre@email.de")}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="bg-secondary border-border text-center text-base h-12"
              maxLength={255}
              autoFocus
            />
            {error && <p className="text-destructive text-xs text-center">{error}</p>}
          </div>

          <Button
            type="submit"
            disabled={submitting || !email}
            className="w-full h-11 bg-primary hover:bg-primary/90 font-semibold"
          >
            {submitting ? _t("Wird gesendet...") : (
              <>
                {_t("Informationen erhalten")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            {_t("Nein danke, vielleicht später")}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            <span>{_t("Kein Spam · Jederzeit abmeldbar · DSGVO-konform")}</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCollectionPopup;
