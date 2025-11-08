import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-pink-200 bg-pink-50/80 backdrop-blur-sm">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* ✅ شعار ومعلومات عامة */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img
                src="/images/logo.png"
                alt="Bele Italia"
                className="h-10 w-10 rounded-full border border-pink-300 object-cover"
              />
              <span className="font-extrabold text-pink-700 text-lg tracking-wide">
                Bele Italia
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Bele Italia — متجر الجمال الإيطالي الفاخر. اكتشفي مجموعتنا المميزة من المكياج والعناية بالبشرة والعطور التي تبرز أناقتكِ كل يوم.
            </p>
          </div>

          {/* ✅ روابط سريعة */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-pink-700">
              {t("footer.quickLinks") || "روابط سريعة"}
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-gray-600 hover:text-pink-600">
                {t("nav.home")}
              </Link>
              <Link to="/about" className="text-sm text-gray-600 hover:text-pink-600">
                {t("nav.about")}
              </Link>
              <Link to="/products" className="text-sm text-gray-600 hover:text-pink-600">
                {t("products")}
              </Link>
              <Link to="/order" className="text-sm text-gray-600 hover:text-pink-600">
                {t("nav.order")}
              </Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-pink-600">
                {t("nav.contact")}
              </Link>
            </nav>
          </div>

          {/* ✅ معلومات التواصل */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-pink-700">
              {t("footer.contact") || "تواصلي معنا"}
            </h3>
            <div className="flex flex-col space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 text-pink-600" />
                <span>عمّان، الأردن – شارع حي عدن</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-pink-600" />
                <span>+962 782633162</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-pink-600" />
                <span>info@beleitalia.com</span>
              </div>

              {/* ✅ روابط السوشيال ميديا */}
              <div className="flex items-center gap-4 mt-3">
                <a href="https://www.instagram.com" target="_blank" className="text-pink-600 hover:text-pink-700">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com" target="_blank" className="text-pink-600 hover:text-pink-700">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ الحقوق */}
        <div className="mt-10 border-t border-pink-200 pt-6 text-center text-sm text-gray-500">
          <p>© {currentYear} Bele Italia — جميع الحقوق محفوظة</p>
          <p className="mt-2 text-xs opacity-70">
تم برمجة الموقع بواسطة طه الخطيب          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
