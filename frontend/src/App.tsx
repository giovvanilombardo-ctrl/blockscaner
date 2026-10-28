import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ChatAssistant from "./pages/ChatAssistant";
import AuthPage from "./cd/account/AuthPage";
import AccountGate from "./cd/account/AccountGate";
import MiArea from "./cd/account/MiArea";
import MiCuenta from "./cd/account/MiCuenta";
import ResetPassword from "./cd/account/ResetPassword";
import AccountPortal from "./pages/AccountPortal";
import Contact from "./pages/Contact";
import SectionPage from "./pages/SectionPage";
import Legal from "./pages/Legal";
import Sitemap from "./pages/Sitemap";
import Kundenservice from "./pages/Kundenservice";
import Ermittlungsplattform from "./pages/Ermittlungsplattform";
import VektorFaehigkeiten from "./pages/VektorFaehigkeiten";
import HelpTopicPage from "./pages/HelpTopicPage";
import CookieConsent, { useCookieConsent } from "./components/CookieConsent";
import EmailCollectionPopup from "./components/EmailCollectionPopup";

const queryClient = new QueryClient();

// Render the visitor email popup only on public-facing routes.
const EmailPopupGate = ({ showEmailPopup, onClose }: { showEmailPopup: boolean; onClose: () => void }) => {
  const { pathname } = useLocation();
  const hidden = ["/admin", "/dashboard", "/konto", "/account", "/login", "/chat", "/reset-password"].some((p) =>
    pathname.startsWith(p)
  );
  if (hidden) return null;
  return <EmailCollectionPopup open={showEmailPopup} onClose={onClose} />;
};

const AppContent = () => {
  const { consent, accept, reject, reset } = useCookieConsent();
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  useEffect(() => {
    // Show email popup after cookie acceptance, if not already collected
    if (consent === "accepted") {
      const alreadyCollected = localStorage.getItem("visitor_email_collected");
      if (!alreadyCollected) {
        // Small delay so cookie banner animates out first
        const timer = setTimeout(() => setShowEmailPopup(true), 800);
        return () => clearTimeout(timer);
      }
    }
  }, [consent]);

  return (
    <>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index onResetCookies={reset} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hilfe" element={<SectionPage key="hilfe" sectionKey="hilfe" onResetCookies={reset} />} />
          <Route path="/hilfe/:slug" element={<HelpTopicPage key="hilfe" sectionKey="hilfe" onResetCookies={reset} />} />
          <Route path="/blockchain-intelligence/:slug" element={<HelpTopicPage key="intelligence" sectionKey="intelligence" onResetCookies={reset} />} />
          <Route path="/forschung/:slug" element={<HelpTopicPage key="forschung" sectionKey="forschung" onResetCookies={reset} />} />
          <Route path="/praevention/:slug" element={<HelpTopicPage key="praevention" sectionKey="praevention" onResetCookies={reset} />} />
          <Route path="/tools/:slug" element={<HelpTopicPage key="tools" sectionKey="tools" onResetCookies={reset} />} />
          <Route path="/blockchain-intelligence" element={<SectionPage key="intelligence" sectionKey="intelligence" onResetCookies={reset} />} />
          <Route path="/forschung" element={<SectionPage key="forschung" sectionKey="forschung" onResetCookies={reset} />} />
          <Route path="/praevention" element={<SectionPage key="praevention" sectionKey="praevention" onResetCookies={reset} />} />
          <Route path="/tools" element={<SectionPage key="tools" sectionKey="tools" onResetCookies={reset} />} />
          <Route path="/methodik" element={<SectionPage key="methodik" sectionKey="methodik" onResetCookies={reset} />} />
          <Route path="/ueber-uns" element={<SectionPage key="ueber-uns" sectionKey="ueber-uns" onResetCookies={reset} />} />
          <Route path="/rechtliches/:slug" element={<Legal onResetCookies={reset} />} />
          <Route path="/rechtliches" element={<Legal onResetCookies={reset} />} />
          <Route path="/kundenservice" element={<Kundenservice />} />
          <Route path="/ermittlungsplattform" element={<Ermittlungsplattform />} />
          <Route path="/vektor-capabilities" element={<VektorFaehigkeiten />} />
          <Route path="/sitemap" element={<Sitemap onResetCookies={reset} />} />
          <Route path="/chat" element={<ChatAssistant />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/dashboard" element={<AccountGate><MiArea /></AccountGate>} />
          <Route path="/konto" element={<AccountGate><MiCuenta /></AccountGate>} />
          <Route path="/account" element={<AccountGate><AccountPortal /></AccountGate>} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <EmailPopupGate showEmailPopup={showEmailPopup} onClose={() => setShowEmailPopup(false)} />
      </BrowserRouter>

      <CookieConsent
        visible={consent === null}
        onAccept={accept}
        onReject={reject}
      />

    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
