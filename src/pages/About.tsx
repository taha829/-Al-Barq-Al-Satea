import HeroSection from "@/components/HeroSection";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Award, Heart, Clock } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import qualityImage from "@/assets/quality-control.jpg";

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: t("about.values.quality"),
      description: t("about.values.qualityDesc"),
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: t("about.values.innovation"),
      description: t("about.values.innovationDesc"),
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: t("about.values.trust"),
      description: t("about.values.trustDesc"),
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: t("about.values.delivery"),
      description: t("about.values.deliveryDesc"),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection
        title={t("about.hero.title")}
        subtitle={t("about.hero.subtitle")}
        backgroundImage={qualityImage}
      />

      {/* Main Content */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              <span className="font-bold text-foreground">{t("home.hero.title")}</span>{" "}
              {t("about.content.intro1")}
            </p>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              {t("about.content.intro2")}
            </p>

            <div className="my-12 rounded-2xl bg-muted p-8">
              <h3 className="mb-4 text-2xl font-bold text-foreground">
                {t("about.content.production")}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mx-2 text-primary">✓</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{t("about.content.printed")}</strong>{" "}
                    {t("about.content.printedDesc")}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mx-2 text-primary">✓</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{t("about.content.unprinted")}</strong>{" "}
                    {t("about.content.unprintedDesc")}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mx-2 text-primary">✓</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{t("about.content.tableCovers")}</strong>{" "}
                    {t("about.content.tableCoversDesc")}
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground">{t("about.content.bundleInfo")}</p>
            </div>

            <div className="mb-12">
              <h3 className="mb-4 text-2xl font-bold text-foreground">
                {t("about.mission.title")}
              </h3>
              <p className="text-lg text-muted-foreground">{t("about.mission.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted py-16">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
            {t("about.values.title")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
