import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteSettings } from "@/lib/types";
import { AboutImageSlideshow } from "@/pages/sections/AboutImageSlideshow";

interface AboutSectionProps {
  settings: SiteSettings | null | undefined;
  aboutText: string;
}

export function AboutSection({ settings, aboutText }: AboutSectionProps) {
  const counters = [
    {
      value: Number(settings?.yearsExp ?? 12),
      suffix: "+",
      label: "Years Experience",
    },
    {
      value: Number(settings?.happyClients ?? 100),
      suffix: "+",
      label: "Happy Clients",
    },
  ];

  return (
    <section id="about" className="py-32 lg:py-40 bg-[#0B0B0B] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Image col */}
          <ScrollReveal direction="left" className="relative">
            <div className="relative">
              <div className="relative overflow-hidden">
                <AboutImageSlideshow
                  images={[
                    "/assets/images/about-photo-1.jpg",
                    "/assets/images/about-photo-2.png",
                  ]}
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-5 -right-5 w-40 h-40 border border-accent/15 pointer-events-none" />
              <div className="absolute -top-5 -left-5 w-24 h-24 border border-white/5 pointer-events-none" />
              {/* Gold line accent */}
              <div className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-accent to-transparent" />
            </div>
          </ScrollReveal>

          {/* Content col */}
          <div>
            <SectionHeading
              label="Our Story"
              title={"The Artist\nBehind the Lens"}
            />
            <ScrollReveal delay={0.1}>
              <p className="text-white/60 leading-[1.8] text-base mb-10 max-w-lg">
                {aboutText}
              </p>
            </ScrollReveal>

            {/* Signature divider */}
            <ScrollReveal delay={0.18}>
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-20 bg-gradient-to-r from-accent to-transparent" />
                <div className="w-2 h-2 bg-accent/40 rotate-45" />
                <div className="h-px flex-1 bg-white/5" />
              </div>
            </ScrollReveal>

            {/* Counters */}
            <div className="grid grid-cols-2 gap-8">
              {counters.map(({ value, suffix, label }, i) => (
                <ScrollReveal key={label} delay={0.08 * i}>
                  <div className="border-l-2 border-accent/40 pl-5 py-2">
                    <p
                      className="font-display text-5xl font-bold text-white leading-none mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <AnimatedCounter target={value} suffix={suffix} />
                    </p>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-white/35 mt-2">
                      {label}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
