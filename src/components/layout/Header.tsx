import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Languages } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { CartIcon } from "@/components/CartIcon";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleLanguage, language } = useLanguage();
  const { t } = useTranslation();

  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/services", label: t("nav.services") },
    { path: "/products", label: t("products") },
    { path: "/order", label: t("nav.order") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-pink-200 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* ✅ الشعار */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Bele Italia Logo"
            className="h-10 w-10 rounded-full border border-pink-300 object-cover"
          />
          <span className="hidden font-extrabold text-xl text-pink-600 sm:inline-block tracking-wide">
            Bele Italia
          </span>
        </Link>

        {/* ✅ القائمة (سطح المكتب) */}
        <nav className="hidden md:flex md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-pink-600 ${
                isActive(item.path) ? "text-pink-600" : "text-gray-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ✅ أدوات الرأس */}
        <div className="flex items-center gap-2">
          <CartIcon />

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            title={language === "en" ? "العربية" : "English"}
            className="text-pink-600 hover:text-pink-700"
          >
            <Languages className="h-5 w-5" />
          </Button>

          <Button
            asChild
            className="hidden md:inline-flex bg-pink-600 hover:bg-pink-700 text-white font-semibold"
          >
            <Link to="/order">{t("nav.bookOrder")}</Link>
          </Button>

          {/* ✅ زر القائمة الجانبية للموبايل */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-pink-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* ✅ القائمة الجانبية (الموبايل) */}
      {mobileMenuOpen && (
        <div className="border-t border-pink-200 bg-white md:hidden">
          <nav className="container flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium transition-colors hover:text-pink-600 ${
                  isActive(item.path) ? "text-pink-600" : "text-gray-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
