import { Layout } from "@/components/layout/Layout";
import {
  useGalleryImages,
  useSaveContact,
  useServices,
  useSiteSettings,
  useTestimonials,
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

const DEFAULT_TESTIMONIALS = [
  {
    id: 1n,
    clientName: "Rahul Kumar Panda",
    clientImage: "",
    review:
      "Absolutely loved the photography! The pictures were natural, cinematic, and beautifully edited. Highly recommended for weddings and special events.",
    rating: 5n,
    order: 1n,
  },
  {
    id: 2n,
    clientName: "Priya Mehta",
    clientImage: "",
    review:
      "Very professional and friendly photographer. The delivery was fast and the quality was outstanding. Everyone in my family loved the photos.",
    rating: 5n,
    order: 2n,
  },
  {
    id: 3n,
    clientName: "Aman Verma",
    clientImage: "",
    review:
      "Best photography experience I've had till now. Creative poses, amazing editing, and great attention to detail. Truly premium work!",
    rating: 5n,
    order: 3n,
  },
  {
    id: 4n,
    clientName: "Sneha Patel",
    clientImage: "",
    review:
      "Our pre-wedding shoot turned out better than we imagined. The cinematic style and color grading looked absolutely stunning.",
    rating: 5n,
    order: 4n,
  },
  {
    id: 5n,
    clientName: "Arjun Mishra",
    clientImage: "",
    review:
      "Highly satisfied with both photography and videography. Every moment was captured perfectly and the final output looked amazing.",
    rating: 5n,
    order: 5n,
  },
];

// ─── Main page component ──────────────────────────────────────────────────────

export function HomePage() {
  // Queries
  const { data: galleryData } = useGalleryImages();
  const { data: testimonialData } = useTestimonials();
  const { data: serviceData } = useServices();
  const { data: settingsRaw } = useSiteSettings();
  const settings = settingsRaw as SiteSettings | null | undefined;
  const saveContact = useSaveContact();

  // Resolved data (fallback to defaults while loading)
  const _gallery = galleryData ?? [];
  const testimonials =
    testimonialData && testimonialData.length > 0
      ? testimonialData
      : DEFAULT_TESTIMONIALS;
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

      <TestimonialsSection testimonials={testimonials} />
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
