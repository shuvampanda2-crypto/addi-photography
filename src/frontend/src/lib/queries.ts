import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  BlogPost,
  ContactMessage,
  GalleryImage,
  PortfolioItem,
  Service,
  SiteSettings,
  Testimonial,
} from "./types";

export function usePortfolioItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolioItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPortfolioItems();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePortfolioItemsByCategory(category: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolioItems", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.listPortfolioItems();
      return actor.listPortfolioItemsByCategory(category);
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGalleryImages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GalleryImage[]>({
    queryKey: ["galleryImages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listGalleryImages();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useBlogPosts(publishedOnly = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts", publishedOnly],
    queryFn: async () => {
      if (!actor) return [];
      return publishedOnly
        ? actor.listPublishedBlogPosts()
        : actor.listBlogPosts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useTestimonials() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTestimonials();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useServices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listServices();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useSiteSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SiteSettings | null>({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSettings();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 15,
  });
}

export function useContactMessages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ContactMessage[]>({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listContactMessages();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isAdmin();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSaveContact() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      service: string;
      budget: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveContactMessage(
        data.name,
        data.email,
        data.service,
        data.budget,
        data.message,
      );
    },
  });
}

export function useUpdateSettings() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settings: SiteSettings) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSettings(settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteSettings"] });
    },
  });
}
