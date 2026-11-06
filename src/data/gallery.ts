// Dummy gallery. Add `src: "/gallery/your-photo.jpg"` (file in /public/gallery) to show a real photo.
export type GalleryItem = { caption: string; place: string; src?: string };

export const gallery: GalleryItem[] = [
  { caption: "Terrace waterproofing", place: "Sample photo 1" },
  { caption: "Bathroom treatment", place: "Sample photo 2" },
  { caption: "Water tank lining", place: "Sample photo 3" },
  { caption: "External wall sealing", place: "Sample photo 4" },
  { caption: "Basement protection", place: "Sample photo 5" },
  { caption: "Roof slab membrane", place: "Sample photo 6" },
];
