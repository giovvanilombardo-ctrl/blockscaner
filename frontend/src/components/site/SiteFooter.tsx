import { t as _t, lang, setLang, LANGS } from "@/i18n";
import { Link } from "react-router-dom";
import { legalPages } from "@/content/site";
import { BrandMark } from "./SiteHeader";
import { Twitter, Facebook, Instagram, Youtube, Music2, Gamepad2 } from "lucide-react";

const headingCls = "text-[13px] font-normal text-[#6b7280] mb-4";
const linkCls = "block text-[13px] font-semibold text-white py-[3px] hover:text-[#00c867] transition-colors";

const Col = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className={headingCls}>{title}</p>
    <div>{children}</div>
  </div>
);

const SiteFooter = ({ onResetCookies }: { onResetCookies?: () => void }) => (
  <footer className="bg-[#05070a] text-white" data-testid="site-footer">
    {/* link columns */}
    <div className="mx-auto max-w-6xl px-6 lg:px-10 pt-16 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
      <Col title={_t("Products")}>
        <Link to="/products" className={linkCls}>Blockscaner</Link>
        <Link to="/products" className={linkCls}>Blockscaner Pro</Link>
        <Link to="/products/step" className={linkCls}>Blockscaner Step</Link>
        <Link to="/academy" className={linkCls}>Blockscaner Academy</Link>
        <Link to="/products" className={linkCls}>{_t("Clubs")}</Link>
      </Col>
      <Col title={_t("Learn")}>
        <Link to="/academy" className={linkCls}>{_t("Start here")}</Link>
        <Link to="/academy" className={linkCls}>{_t("Glossary")}</Link>
        <Link to="/coins/bitcoin" className={linkCls}>{_t("Buy Bitcoin")}</Link>
        <Link to="/coins/ethereum" className={linkCls}>{_t("Buy Ethereum")}</Link>
        <Link to="/coins/solana" className={linkCls}>{_t("Buy Solana")}</Link>
        <Link to="/coins/dogecoin" className={linkCls}>{_t("Buy Dogecoin")}</Link>
        <Link to="/academy" className={linkCls}>ESG & Whitepapers</Link>
      </Col>
      <Col title={_t("About us")}>
        <Link to="/about" className={linkCls}>{_t("Work with us")}</Link>
        <Link to="/blog" className={linkCls}>{_t("Talk about us")}</Link>
        <Link to="/about" className={linkCls}>{_t("About us")}</Link>
        <Link to="/products" className={linkCls}>{_t("Our Products")}</Link>
        <Link to={`/rechtliches/${legalPages[0]?.slug ?? ""}`} className={linkCls}>{_t("Legal & Privacy")}</Link>
        <Link to="/about" className={linkCls}>{_t("Leadership")}</Link>
        <Link to="/business" className={linkCls}>{_t("Order transparency")}</Link>
      </Col>
      <Col title={_t("Support")}>
        <Link to="/support" className={linkCls}>{_t("Support Center")}</Link>
        <Link to="/products" className={linkCls}>{_t("Prices and Fees")}</Link>
        <Link to="/support" className={linkCls}>{_t("Frequently Asked")}</Link>
        <Link to="/support" className={linkCls}>FAQ {_t("Security")}</Link>
        <Link to="/contact" className={linkCls}>{_t("Crypto complaints")}</Link>
        <Link to="/contact" className={linkCls}>{_t("Payment Account Complaints")}</Link>
        <Link to="/contact" className={linkCls}>{_t("Payment Account Transparency")}</Link>
        <Link to="/contact" className={linkCls}>{_t("Insider Information")}</Link>
      </Col>
    </div>

    {/* brand row */}
    <div className="mx-auto max-w-6xl px-6 lg:px-10 mt-14 flex flex-wrap items-center justify-between gap-6">
      <span className="flex items-center gap-2.5">
        <BrandMark className="h-7 w-7" />
        <span className="text-lg font-semibold tracking-tight lowercase">blockscaner</span>
      </span>
      <span className="flex items-center gap-1.5">
        {LANGS.map((l) => (
          <button key={l.code} onClick={() => setLang(l.code)}
            className={`px-2 py-1 text-[11px] font-semibold rounded transition ${lang === l.code ? "text-white bg-white/10" : "text-[#6b7280] hover:text-white"}`}>
            {l.label}
          </button>
        ))}
      </span>
      <span className="flex items-center gap-3 text-[13px] text-[#9ca3af]">
        {_t("Download")}
        <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 hover:border-white/40 transition cursor-pointer" title="App Store">
          <svg viewBox="0 0 24 24" style={{ width: 14, height: 14 }}><path d="M17.05 20.28c-.98.95-2.05.86-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.98-.2 1.92-.86 3.24-.77 1.58.13 2.77.75 3.55 1.92-3.26 1.95-2.47 6.27.46 7.47-.6 1.57-1.37 3.13-2.33 3.55M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25" fill="#fff"/></svg>
        </span>
        <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 hover:border-white/40 transition cursor-pointer" title="Google Play">
          <svg viewBox="0 0 24 24" style={{ width: 12, height: 12 }}><path d="M5 3.5v17l14-8.5z" fill="#fff" /></svg>
        </span>
      </span>
      <span className="flex items-center gap-4 text-[#9ca3af]">
        <Twitter className="h-4 w-4 hover:text-white transition cursor-pointer" />
        <Facebook className="h-4 w-4 hover:text-white transition cursor-pointer" />
        <Instagram className="h-4 w-4 hover:text-white transition cursor-pointer" />
        <Music2 className="h-4 w-4 hover:text-white transition cursor-pointer" />
        <Youtube className="h-4 w-4 hover:text-white transition cursor-pointer" />
        <Gamepad2 className="h-4 w-4 hover:text-white transition cursor-pointer" />
      </span>
    </div>

    {/* legal small print */}
    <div className="mx-auto max-w-6xl px-6 lg:px-10 mt-12 space-y-4 text-[10.5px] leading-relaxed text-[#6b7280]">
      <p>
        {_t("Crypto-asset services. Crypto-asset services are provided by Blockscaner under Regulation (EU) 2023/1114 (MiCAR), for the provision of the following services: the custody and administration of crypto-assets on behalf of clients, the exchange of crypto-assets for funds, the exchange of crypto-assets for other crypto-assets, the execution of orders for crypto-assets on behalf of clients, the placing of crypto-assets, providing advice on crypto-assets, providing portfolio management on crypto-assets, providing transfer services for crypto-assets on behalf of clients.")}
      </p>
      <p>
        {_t("Contractual Documentation. For the contractual and economic terms and conditions, please refer to the Information Sheets and the Terms & Conditions. For details of the Blockscaner group entity providing services to you, please consult the Terms & Conditions. For support enquiries, please contact us via Customer Support.")}
      </p>
      <p>
        {_t("Payment Account. Blockscaner provides payment account services in cooperation with regulated payment institutions, in accordance with applicable European payment services regulation.")}
      </p>
      <p>
        {_t("Risk Warning. Crypto-assets are instruments characterised by high volatility and carry a significant risk of loss, including total loss, of the capital invested. Crypto-assets held do not benefit from the deposit guarantee schemes established under Directive 2014/49/EU, nor from investor compensation schemes under Directive 97/9/EC. Past performance and projections do not constitute a guarantee of future results. For an overview of the risks, please refer to the Risk Disclosure.")}
      </p>
    </div>

    {/* bottom line */}
    <div className="mx-auto max-w-6xl px-6 lg:px-10 mt-10 border-t border-white/10 py-5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[11px] text-[#6b7280]">
      <span>© {new Date().getFullYear()} Blockscaner. {_t("All rights reserved")}</span>
      {onResetCookies && (
        <button onClick={onResetCookies} className="text-[#9ca3af] hover:text-white transition text-left" data-testid="footer-cookie-settings">
          {_t("Update cookie settings")}
        </button>
      )}
    </div>
  </footer>
);

export default SiteFooter;
