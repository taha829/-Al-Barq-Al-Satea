import HeroSection from "@/components/HeroSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, MessageCircle, User } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import qualityImage from "@/assets/quality-control.jpg";

const Contact = () => {
  const { t } = useTranslation();
  const phoneNumber = "0799259682";

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection
        title={t("contact.hero.title")}
        subtitle={t("contact.hero.subtitle")}
        backgroundImage={qualityImage}
      />

      {/* Contact Information */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
                  {t("contact.info.title")}
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">
                        {t("contact.info.location")}
                      </h3>
                      <p className="whitespace-pre-line text-muted-foreground">
                        {t("contact.info.locationValue")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">
                        {t("contact.info.phone")}
                      </h3>
                      <a
                        href={`tel:+962${phoneNumber.slice(1)}`}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {phoneNumber}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">
                        {t("contact.info.whatsapp")}
                      </h3>
                      <a
                        href={`https://wa.me/962${phoneNumber.slice(1)}?text=${encodeURIComponent(
                          t("contact.whatsappMessage")
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        {phoneNumber}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">
                        {t("contact.info.salesManager")}
                      </h3>
                      <p className="text-muted-foreground">{t("contact.info.salesManagerName")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <MessageCircle className="mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-xl font-semibold">
                    {t("contact.actions.whatsappTitle")}
                  </h3>
                  <p className="mb-4 text-sm opacity-90">{t("contact.actions.whatsappDesc")}</p>
                  <Button asChild variant="secondary" size="lg">
                    <a
                      href={`https://wa.me/962${phoneNumber.slice(1)}?text=${encodeURIComponent(
                        t("contact.whatsappMessage")
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("contact.actions.whatsappBtn")}
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-secondary text-secondary-foreground">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <Phone className="mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-xl font-semibold">{t("contact.actions.callTitle")}</h3>
                  <p className="mb-4 text-sm opacity-90">{t("contact.actions.callDesc")}</p>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
                  >
                    <a href={`tel:+962${phoneNumber.slice(1)}`}>{t("contact.actions.callBtn")}</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
