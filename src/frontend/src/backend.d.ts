import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
export type UserId = Principal;
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
export interface GalleryImage {
    id: bigint;
    title: string;
    order: bigint;
    imageUrl: string;
}
export interface PortfolioItem {
    id: bigint;
    title: string;
    featured: boolean;
    order: bigint;
    description: string;
    imageUrl: string;
    category: string;
}
export interface Service {
    id: bigint;
    title: string;
    order: bigint;
    icon: string;
    description: string;
}
export interface Testimonial {
    id: bigint;
    review: string;
    clientName: string;
    order: bigint;
    clientImage: string;
    rating: bigint;
}
export interface backendInterface {
    addAdmin(newAdmin: UserId): Promise<void>;
    addBlogPost(title: string, category: string, excerpt: string, imageUrl: string, content: string, date: string, published: boolean): Promise<BlogPost>;
    addGalleryImage(imageUrl: string, title: string, order: bigint): Promise<GalleryImage>;
    addPortfolioItem(title: string, category: string, imageUrl: string, description: string, featured: boolean, order: bigint): Promise<PortfolioItem>;
    addService(title: string, description: string, icon: string, order: bigint): Promise<Service>;
    addTestimonial(clientName: string, clientImage: string, review: string, rating: bigint, order: bigint): Promise<Testimonial>;
    deleteBlogPost(id: bigint): Promise<boolean>;
    deleteGalleryImage(id: bigint): Promise<boolean>;
    deletePortfolioItem(id: bigint): Promise<boolean>;
    deleteService(id: bigint): Promise<boolean>;
    deleteTestimonial(id: bigint): Promise<boolean>;
    getBlogPost(id: bigint): Promise<BlogPost | null>;
    getPortfolioItem(id: bigint): Promise<PortfolioItem | null>;
    getSettings(): Promise<SiteSettings>;
    isAdmin(): Promise<boolean>;
    listAdmins(): Promise<Array<UserId>>;
    listBlogPosts(): Promise<Array<BlogPost>>;
    listBlogPostsByCategory(category: string): Promise<Array<BlogPost>>;
    listContactMessages(): Promise<Array<ContactMessage>>;
    listGalleryImages(): Promise<Array<GalleryImage>>;
    listPortfolioItems(): Promise<Array<PortfolioItem>>;
    listPortfolioItemsByCategory(category: string): Promise<Array<PortfolioItem>>;
    listPublishedBlogPosts(): Promise<Array<BlogPost>>;
    listServices(): Promise<Array<Service>>;
    listTestimonials(): Promise<Array<Testimonial>>;
    removeAdmin(target: UserId): Promise<void>;
    saveContactMessage(name: string, email: string, service: string, budget: string, message: string): Promise<ContactMessage>;
    setFirstAdmin(): Promise<boolean>;
    toggleFeaturedPortfolioItem(id: bigint): Promise<boolean>;
    updateBlogPost(post: BlogPost): Promise<boolean>;
    updateGalleryImage(image: GalleryImage): Promise<boolean>;
    updatePortfolioItem(item: PortfolioItem): Promise<boolean>;
    updateService(svc: Service): Promise<boolean>;
    updateSettings(s: SiteSettings): Promise<void>;
    updateTestimonial(t: Testimonial): Promise<boolean>;
}
