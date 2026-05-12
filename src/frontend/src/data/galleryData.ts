export type MediaType = "image" | "video";
export type GalleryCategory = "wedding" | "brand-promotions";
export interface GalleryItem {
  id: string;
  type: MediaType;
  src: string;
  title: string;
  category: GalleryCategory;
}
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    type: "image",
    src: "/assets/10.jpg_1-019e1c7d-c5f9-73a0-8d11-789da4d6e05c.jpeg",
    title: "Wedding Rings",
    category: "wedding",
  },
  {
    id: "g2",
    type: "image",
    src: "/assets/dsc_4270-019e1c7d-c68e-745e-b867-3d047b0a584f.jpg",
    title: "Bridal Portrait",
    category: "wedding",
  },
  {
    id: "g3",
    type: "image",
    src: "/assets/07.jpg_1-019e1c7d-c6ac-77ed-9c26-c66151d6f24c.jpeg",
    title: "Couple Silhouette",
    category: "wedding",
  },
  {
    id: "g4",
    type: "image",
    src: "/assets/lastpage-019e1c7d-cacc-7248-9f74-ef29d74ac1e5.jpg",
    title: "Wedding Story",
    category: "wedding",
  },
  {
    id: "g5",
    type: "image",
    src: "/assets/rpy_3636-019e1c7d-d505-724f-be5b-b5e91f4ad20e.jpg",
    title: "Bridal Jewelry",
    category: "wedding",
  },
  {
    id: "g6",
    type: "image",
    src: "/assets/rpy_3625-019e1c7d-d61d-72b5-bba4-34311c9540f8.jpg",
    title: "Bride Portrait",
    category: "wedding",
  },
  {
    id: "g7",
    type: "image",
    src: "/assets/rpy_3874-019e1c7d-d98d-7750-ab41-1bdad5c0163b.jpg",
    title: "Bridal Mehndi",
    category: "wedding",
  },
  {
    id: "g8",
    type: "image",
    src: "/assets/rpy_3632_1-019e1c7d-db05-722c-a89c-136607f71fe9.jpg",
    title: "Bridal Close-up",
    category: "wedding",
  },
  {
    id: "g9",
    type: "image",
    src: "/assets/dsc_3284-019e1c7d-db18-7279-bc1a-6e80d137500f.jpg",
    title: "Henna Hands",
    category: "wedding",
  },
  {
    id: "g10",
    type: "image",
    src: "/assets/dsc_5213_1_1-019e1c7d-dc65-726b-a8a0-2f0b803c3250.jpg",
    title: "Groom Portrait",
    category: "wedding",
  },
  {
    id: "g11",
    type: "image",
    src: "/assets/dsc_5336-019e1c7d-de6b-71a9-bf69-21fef032ee19.jpg",
    title: "Royal Couple",
    category: "wedding",
  },
  {
    id: "g12",
    type: "image",
    src: "/assets/dsc_3325-019e1c7d-e103-733a-94ed-60a308c46b75.jpg",
    title: "Mehndi Ceremony",
    category: "wedding",
  },
  {
    id: "g13",
    type: "image",
    src: "/assets/rpy_3660-019e1c7d-e1cd-7693-9c6b-8533aee2aafc.jpg",
    title: "Pink Dupatta Bride",
    category: "wedding",
  },
  {
    id: "g14",
    type: "image",
    src: "/assets/01.jpg_1-019e1c7d-e469-725d-9615-42e11de2c284.jpeg",
    title: "Couple on Road",
    category: "wedding",
  },
  {
    id: "v1",
    type: "video",
    src: "/assets/gallery-video-1.mp4",
    title: "Brand Film 1",
    category: "brand-promotions",
  },
  {
    id: "v2",
    type: "video",
    src: "/assets/gallery-video-2.mp4",
    title: "Brand Film 2",
    category: "brand-promotions",
  },
  {
    id: "v3",
    type: "video",
    src: "/assets/gallery-video-3.mp4",
    title: "Brand Film 3",
    category: "brand-promotions",
  },
];
