import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Service } from "@/lib/types";
import {
  Camera,
  Film,
  ImageIcon,
  Package,
  ShoppingBag,
  Smartphone,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  camera: Camera,
  film: Film,
  users: Users,
  package: Package,
  "shopping-bag": ShoppingBag,
  smartphone: Smartphone,
  star: Star,
  image: ImageIcon,
};

function ServiceIcon({ icon }: { icon: string }) {
  const Icon = iconMap[icon] ?? Camera;
  return <Icon size={24} className="text-accent" />;
}

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-32 lg:py-40 bg-[#0B0B0B]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          label="What We Offer"
          title="Services"
          subtitle="Comprehensive photography and visual storytelling tailored to your vision."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.03]">
          {services.map((service, i) => (
            <ScrollReveal key={String(service.id)} delay={i * 0.07}>
              <motion.div
                data-ocid={`services.card.${i + 1}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative bg-[#0B0B0B] p-10 group overflow-hidden cursor-default"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/6 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Top border highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/40 transition-all duration-500" />

                <div className="relative">
                  {/* Icon box */}
                  <div className="w-12 h-12 border border-accent/20 flex items-center justify-center mb-8 group-hover:border-accent/60 transition-colors duration-400">
                    <ServiceIcon icon={service.icon} />
                  </div>

                  <h3
                    className="font-display text-2xl text-white mb-4 group-hover:text-accent transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
