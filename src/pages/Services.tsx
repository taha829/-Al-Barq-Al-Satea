import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, FileText, Package, Scissors, Archive } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import productsImage from "@/assets/products-showcase.jpg";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Sparkles className="h-10 w-10" />,
      title: t("services.items.printed.title"),
      description: t("services.items.printed.description"),
    },
    {
      icon: <FileText className="h-10 w-10" />,
      title: t("services.items.unprinted.title"),
      description: t("services.items.unprinted.description"),
    },
    {
      icon: <Package className="h-10 w-10" />,
      title: t("services.items.tableCovers.title"),
      description: t("services.items.tableCovers.description"),
    },
    {
      icon: <Scissors className="h-10 w-10" />,
      title: t("services.items.custom.title"),
      description: t("services.items.custom.description"),
    },
    {
      icon: <Archive className="h-10 w-10" />,
      title: t("services.items.bulk.title"),
      description: t("services.items.bulk.description"),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection
        title={t("services.hero.title")}
        subtitle={t("services.hero.subtitle")}
        backgroundImage={productsImage}
      />

      {/* Services Grid */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <Card key={index} className="transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="bg-muted py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              {t("services.commitment.title")}
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
              {t("services.commitment.description1")}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t("services.commitment.description2")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
