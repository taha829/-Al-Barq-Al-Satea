import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const FixedContactButtons = () => {
  const { t } = useTranslation();
  const phoneNumber = "0782633162";
  const whatsappMessage = t("contact.whatsappMessage");

  return (
    <>
      {/* WhatsApp Button - Bottom Right */}
      <a
        href={`https://wa.me/962${phoneNumber.slice(1)}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </a>

      {/* Call Button - Bottom Left */}
      <a href={`tel:+962${phoneNumber.slice(1)}`} className="fixed bottom-6 left-6 z-50">
        <Button
          size="lg"
          variant="secondary"
          className="h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-110"
        >
          <Phone className="h-6 w-6" />
        </Button>
      </a>
    </>
  );
};

export default FixedContactButtons;
