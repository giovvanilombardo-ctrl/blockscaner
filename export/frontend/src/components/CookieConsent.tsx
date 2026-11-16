import { t as _t } from "@/i18n";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, Shield } from "lucide-react";

const COOKIE_KEY = "cookie_consent";

export function useCookieConsent() {
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored === "accepted" || stored === "rejected") return stored;
    return null;
  });

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setConsent("accepted");
  };

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setConsent("rejected");
  };

  const reset = () => {
    localStorage.removeItem(COOKIE_KEY);
    localStorage.removeItem("visitor_email_collected");
    setConsent(null);
  };

  return { consent, accept, reject, reset };
}

interface CookieConsentProps {
  onAccept: () => void;
  onReject: () => void;
  visible: boolean;
}

const CookieConsent = ({ onAccept, onReject, visible }: CookieConsentProps) => {
  const [animateOut, setAnimateOut] = useState(false);

  if (!visible) return null;

  const handleAccept = () => {
    setAnimateOut(true);
    setTimeout(onAccept, 300);
  };

  const handleReject = () => {
    setAnimateOut(true);
    setTimeout(onReject, 300);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        animateOut ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="bg-card/95 backdrop-blur-xl border-t border-border shadow-2xl">
        <div className="container mx-auto px-4 py-5 md:py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="rounded-full bg-primary/10 p-2.5 mt-0.5 shrink-0">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground text-sm md:text-base mb-1">
                  {_t("🍪 Wir verwenden Cookies")}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                  {_t("Wir nutzen Cookies und ähnliche Technologien, um Ihnen ein optimales Erlebnis zu bieten und unsere Dienste zu verbessern. Mit Ihrer Zustimmung können wir Sie kontaktieren, falls Sie unsere Beratung noch nicht abgeschlossen haben.")}
                </p>
                <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>{_t("DSGVO-konform · Ihre Daten sind bei uns sicher")}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 shrink-0 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReject}
                className="flex-1 md:flex-none border-border text-muted-foreground hover:text-foreground"
              >
                {_t("Ablehnen")}
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="flex-1 md:flex-none bg-primary hover:bg-primary/90"
              >
                {_t("Akzeptieren")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
