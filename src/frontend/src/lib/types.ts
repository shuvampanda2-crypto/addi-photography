export interface PortfolioItem {
  id: bigint;
  title: string;
  featured: boolean;
  order: bigint;
  description: string;
  imageUrl: string;
  category: string;
}

export interface GalleryImage {
  id: bigint;
  title: string;
  order: bigint;
  imageUrl: string;
}

export interface BlogPost {
  id: bigint;
  title: string;
  content: string;
  date: string;
  published: boolean;
  imageUrl: string;
  excerpt: string;
  category: string;
}

export interface Testimonial {
  id: bigint;
  review: string;
  clientName: string;
  order: bigint;
  clientImage: string;
  rating: bigint;
}

export interface Service {
  id: bigint;
  title: string;
  order: bigint;
  icon: string;
  description: string;
}

export interface SiteSettings {
  aboutImage: string;
  heroHeading: string;
  yearsExp: bigint;
  twitter: string;
  tagline: string;
  instagram: string;
  businessName: string;
  email: string;
  facebook: string;
  awards: bigint;
  address: string;
  aboutText: string;
  youtube: string;
  phone: string;
  happyClients: bigint;
  heroSubheading: string;
  projectsCompleted: bigint;
}

export interface ContactMessage {
  id: bigint;
  service: string;
  name: string;
  createdAt: bigint;
  email: string;
  message: string;
  budget: string;
}
