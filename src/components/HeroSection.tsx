import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  children?: ReactNode;
}

const HeroSection = ({ title, subtitle, backgroundImage, children }: HeroSectionProps) => {
  return (
    <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{title}</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">{subtitle}</p>
        {children}
      </div>
    </section>
  );
};

export default HeroSection;
