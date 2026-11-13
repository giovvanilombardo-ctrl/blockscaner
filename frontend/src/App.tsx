import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Products from "./pages/platform/Products";
import StepPage from "./pages/platform/Step";
import Academy from "./pages/platform/Academy";
import AcademyArticle from "./pages/platform/AcademyArticle";
import AcademyBitcoin from "./pages/platform/AcademyBitcoin";
import AcademyPopcat from "./pages/platform/AcademyPopcat";
import AcademyBonds from "./pages/platform/AcademyBonds";
import AcademyOptions from "./pages/platform/AcademyOptions";
import AcademyStakeholders from "./pages/platform/AcademyStakeholders";
import AcademyERC from "./pages/platform/AcademyERC";
import AcademyDePIN from "./pages/platform/AcademyDePIN";
import AcademyRWA from "./pages/platform/AcademyRWA";
import AcademyFutures from "./pages/platform/AcademyFutures";
import AcademyWyckoff from "./pages/platform/AcademyWyckoff";
import AcademySupertrend from "./pages/platform/AcademySupertrend";
import AcademySonic from "./pages/platform/AcademySonic";
import AcademyPoison from "./pages/platform/AcademyPoison";
import AcademyBerachain from "./pages/platform/AcademyBerachain";
import Markets from "./pages/platform/Markets";
import Business from "./pages/platform/Business";
import About from "./pages/platform/About";
import Blog from "./pages/platform/Blog";
import Support from "./pages/platform/Support";
import CoinDetail from "./pages/platform/CoinDetail";
import Kundenservice from "./pages/Kundenservice";
import Ermittlungsplattform from "./pages/Ermittlungsplattform";
import VektorFaehigkeiten from "./pages/VektorFaehigkeiten";
import HelpTopicPage from "./pages/HelpTopicPage";
import CookieConsent, { useCookieConsent } from "./components/CookieConsent";

const queryClient = new QueryClient();

const AppContent = () => {
  const { consent, accept, reject, reset } = useCookieConsent();

  return (
    <>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index onResetCookies={reset} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/step" element={<StepPage />} />
          <Route path="/products/academy" element={<Academy />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/products/academy/ethereum-ico" element={<AcademyArticle />} />
          <Route path="/products/academy/bitcoin" element={<AcademyBitcoin />} />
          <Route path="/products/academy/popcat" element={<AcademyPopcat />} />
          <Route path="/products/academy/bonds" element={<AcademyBonds />} />
          <Route path="/products/academy/options" element={<AcademyOptions />} />
          <Route path="/products/academy/stakeholders" element={<AcademyStakeholders />} />
          <Route path="/products/academy/erc-8004" element={<AcademyERC />} />
          <Route path="/products/academy/depin" element={<AcademyDePIN />} />
          <Route path="/products/academy/rwa" element={<AcademyRWA />} />
          <Route path="/products/academy/futures" element={<AcademyFutures />} />
          <Route path="/products/academy/wyckoff" element={<AcademyWyckoff />} />
          <Route path="/products/academy/supertrend" element={<AcademySupertrend />} />
          <Route path="/products/academy/sonic" element={<AcademySonic />} />
          <Route path="/products/academy/address-poisoning" element={<AcademyPoison />} />
          <Route path="/products/academy/berachain" element={<AcademyBerachain />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/markets/:coinId" element={<CoinDetail />} />
          <Route path="/business" element={<Business />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/support" element={<Support />} />
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
          <Route path="/konto" element={<AccountGate><AccountPortal /></AccountGate>} />
          <Route path="/account" element={<AccountGate><AccountPortal /></AccountGate>} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

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
