import { Tables } from "@/integrations/supabase/types";

export type DatabasePlant = Tables<"plants">;

// Helper to get image for plant
export const getPlantImage = (plant: DatabasePlant): string => {
  // If plant has image_url from database, use that
  if (plant.image_url) {
    return plant.image_url;
  }
  
  // Otherwise, map local images based on plant id
  const imageMap: Record<string, string> = {
    "aloe-vera": "/src/assets/plants/aloe-vera.jpg",
    "turmeric": "/src/assets/plants/turmeric.jpg",
    "lavender": "/src/assets/plants/lavender.jpg",
    "ginger": "/src/assets/plants/ginger.jpg",
    "peppermint": "/src/assets/plants/peppermint.jpg",
    "chamomile": "/src/assets/plants/chamomile.jpg",
  };
  
  return imageMap[plant.id] || "/placeholder.svg";
};
