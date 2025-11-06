import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center space-x-2 rtl:space-x-reverse">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">⚡</span>
              </div>
              <span className="font-bold text-foreground">{t("home.hero.title").split(" ")[0] + " " + t("home.hero.title").split(" ")[1] + " " + t("home.hero.title").split(" ")[2]}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("footer.description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">{t("footer.quickLinks")}</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                {t("nav.home")}
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                {t("nav.about")}
              </Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-primary">
                {t("nav.services")}
              </Link>
              <Link to="/order" className="text-sm text-muted-foreground hover:text-primary">
                {t("nav.order")}
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                {t("nav.contact")}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">{t("footer.contact")}</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-start space-x-2 text-sm rtl:space-x-reverse">
                <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">{t("home.welcome.location")}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm rtl:space-x-reverse">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">0799 25 96 82</span>
              </div>
              <div className="flex items-center space-x-2 text-sm rtl:space-x-reverse">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">{t("contact.info.salesManagerName")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>{t("footer.copyright").replace("{year}", currentYear.toString())}</p>
          <p className="mt-2 text-xs opacity-75">{t("footer.developedBy")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
