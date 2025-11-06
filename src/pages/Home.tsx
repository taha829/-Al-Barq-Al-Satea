import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Package, Scissors, Truck, Users, CheckCircle, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import heroImage from "@/assets/hero-manufacturing.jpg";
import productsImage from "@/assets/products-showcase.jpg";

const Home = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: t("home.features.printed"),
      description: t("home.features.printedDesc"),
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: t("home.features.tableCovers"),
      description: t("home.features.tableCoversDesc"),
    },
    {
      icon: <Scissors className="h-8 w-8" />,
      title: t("home.features.customSizes"),
      description: t("home.features.customSizesDesc"),
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: t("home.features.bundles"),
      description: t("home.features.bundlesDesc"),
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: t("home.features.delivery"),
      description: t("home.features.deliveryDesc"),
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t("home.features.service"),
      description: t("home.features.serviceDesc"),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <HeroSection
        title={t("home.hero.title")}
        subtitle={t("home.hero.subtitle")}
        backgroundImage={heroImage}
      >
        <Button asChild size="lg" className="text-lg">
          <Link to="/order">{t("home.hero.cta")}</Link>
        </Button>
      </HeroSection>

      {/* About Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              {t("home.welcome.title")}
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
              {t("home.welcome.description1")}{" "}
              <span className="font-semibold text-foreground">{t("home.welcome.location")}</span>.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
              {t("home.welcome.description2")}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t("home.welcome.description3")}
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-muted py-16">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
            {t("home.features.title")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
                {t("home.quality.title")}
              </h2>
              <p className="mb-4 text-lg text-muted-foreground">
                {t("home.quality.description1")}
              </p>
              <p className="mb-6 text-lg text-muted-foreground">
                {t("home.quality.description2")}
              </p>
              <Button asChild size="lg">
                <Link to="/services">{t("home.quality.cta")}</Link>
              </Button>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={productsImage}
                alt="Our Products"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
            {t("home.cta.title")}
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            {t("home.cta.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/order">{t("home.cta.bookOrder")}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">{t("home.cta.contact")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
