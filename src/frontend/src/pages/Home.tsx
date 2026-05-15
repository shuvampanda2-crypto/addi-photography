import { Layout } from "@/components/layout/Layout";
import {
  useGalleryImages,
  useSaveContact,
  useServices,
  useSiteSettings,
} from "@/lib/queries";
import type { SiteSettings } from "@/lib/types";
import { useState } from "react";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { CtaSection } from "./sections/CtaSection";
import { EquipmentSection } from "./sections/EquipmentSection";
import { GallerySection } from "./sections/GallerySection";
import { HeroSection } from "./sections/HeroSection";
import { ServicesSection } from "./sections/ServicesSection";
import { ShowcaseSection } from "./sections/ShowcaseSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

// ─── Default / fallback data ──────────────────────────────────────────────────

const DEFAULT_SERVICES = [
  {
    id: 1n,
    title: "Wedding Photography",
    description:
      "Full-day cinematic wedding coverage with a narrative editorial approach.",
    icon: "camera",
    order: 1n,
  },
  {
    id: 2n,
    title: "Cinematic Videography",
    description:
      "Breathtaking wedding films and brand videos that tell your story.",
    icon: "film",
    order: 2n,
  },
  {
    id: 3n,
    title: "Brand Promotions",
    description:
      "Strategic brand content and promotions to elevate your identity and digital presence.",
    icon: "image",
    order: 3n,
  },
];

const _DEFAULT_TESTIMONIALS = [
  {
    id: 1n,
    clientName: "Rinki Sahoo",
    clientImage: "",
    review: "Budget friendly photography and quality is super",
    rating: 5n,
    order: 1n,
  },
  {
    id: 2n,
    clientName: "Guruprasad Behera",
    clientImage: "",
    review: "Best capturing of moments by their professional team",
    rating: 5n,
    order: 2n,
  },
  {
    id: 3n,
    clientName: "Trilochan Pradhan",
    clientImage: "",
    review:
      "Excellent service by the photography team and the owner Kiran is best as he gave full effort",
    rating: 5n,
    order: 3n,
  },
  {
    id: 4n,
    clientName: "Lucky Pradhan",
    clientImage: "",
    review: "Good service with best budget and quality is also best",
    rating: 5n,
    order: 4n,
  },
  {
    id: 5n,
    clientName: "dasventures .2025",
    clientImage: "",
    review:
      "The quality of work was truly outstanding. From pre-wedding moments to the final wedding rituals, everything was captured beautifully. The cinematic wedding film looked like a movie. We are extremely satisfied with the photos, album design, and overall experience.",
    rating: 5n,
    order: 5n,
  },
  {
    id: 6n,
    clientName: "kalpana sahoo",
    clientImage: "",
    review:
      "You are a true artist! I cannot believe how amazing this turned out. You really caught the perfect moment. I am so impressed with this. Wow, these photos and the video are just beautiful! Thank you so much for your hard work. You made me feel so comfortable and the results are magical.",
    rating: 5n,
    order: 6n,
  },
  {
    id: 7n,
    clientName: "Bhabani",
    clientImage: "",
    review:
      "Amazing experience from start to finish. The team handled our wedding coverage perfectly and delivered beautiful memories that we will cherish forever. Excellent photography skills, cinematic videography, and great customer service. Highly recommended!",
    rating: 5n,
    order: 7n,
  },
  {
    id: 8n,
    clientName: "Tiki Sahoo",
    clientImage: "",
    review:
      "Choosing this photography team was one of the best decisions for our wedding. They captured every emotion, smile, and special moment beautifully. The entire team was friendly, cooperative, and hardworking. We truly loved the final photos and cinematic wedding film.",
    rating: 5n,
    order: 8n,
  },
  {
    id: 9n,
    clientName: "Rosemary Spa cum saloon",
    clientImage: "",
    review:
      "Excellent wedding photography service! Beautiful candid shots, cinematic video, and very professional behavior. Thank you for capturing our special day so perfectly. Highly recommended!",
    rating: 5n,
    order: 9n,
  },
  {
    id: 10n,
    clientName: "Gautam Isharani",
    clientImage: "",
    review:
      "Best Photography and videography at our marriage professional person with good camera knowledge",
    rating: 5n,
    order: 10n,
  },
];

// ─── Main page component ──────────────────────────────────────────────────────

export function HomePage() {
  // Queries
  const { data: galleryData } = useGalleryImages();

  const { data: serviceData } = useServices();
  const { data: settingsRaw } = useSiteSettings();
  const settings = settingsRaw as SiteSettings | null | undefined;
  const saveContact = useSaveContact();

  // Resolved data (fallback to defaults while loading)
  const _gallery = galleryData ?? [];

  const services =
    serviceData && serviceData.length > 0 ? serviceData : DEFAULT_SERVICES;

  const heroHeading =
    settings?.heroHeading ?? "Capturing Moments, Creating Memories";
  const heroSubheading =
    settings?.heroSubheading ??
    "cinematic photography & events based in Cuttack, Odisha.";
  const aboutText =
    settings?.aboutText ??
    "We are Addi Photography & Bj Events — a passionate photography and events studio dedicated to crafting cinematic imagery that resonates deeply. Based in Cuttack, Odisha, we specialize in weddings, pre-wedding shoots, candid photography, and cinematic films, bringing a director's eye to every frame and transforming your moments into timeless memories.";

  return (
    <Layout>
      <HeroSection heading={heroHeading} subheading={heroSubheading} />

      <AboutSection settings={settings} aboutText={aboutText} />

      <ServicesSection services={services} />

      <ShowcaseSection />

      <TestimonialsSection />
      <EquipmentSection />

      <GallerySection />

      <CtaSection />

      <ContactSection
        settings={settings}
        onSubmit={(data) => saveContact.mutateAsync(data) as Promise<unknown>}
      />
    </Layout>
  );
}
