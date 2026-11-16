import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/site/SiteLayout";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <SiteLayout>
      <Helmet>
        <title>{_t("Kontakt – Krypto-Betrugsfall melden | Blockscaner")}</title>
        <meta name="description" content="Melden Sie Ihren Krypto-Betrugsfall über unser sicheres Kontaktformular. Unser Forensik-Team meldet sich innerhalb von 24 Stunden bei Ihnen." />
        <link rel="canonical" href="https://blockchain-24.com/contact" />
        <meta property="og:title" content="Kontakt – Krypto-Betrugsfall melden" />
        <meta property="og:description" content="Sicheres Kontaktformular für Opfer von Krypto-Betrug. Antwort innerhalb von 24 Stunden." />
        <meta property="og:url" content="https://blockchain-24.com/contact" />
      </Helmet>
      {/* Contact Form */}
      <div>
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {_t("Kontaktformular für Betrugsopfer")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {_t("Füllen Sie das folgende Formular aus, damit wir Ihren Fall bewerten und Ihnen schnellstmöglich helfen können.")}
            </p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-6 md:p-10 glow-border">
            <ContactForm />
          </div>
        </div>
      </section>
      </div>
    </SiteLayout>
  );
};

export default Contact;
