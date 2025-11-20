import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plant } from "@/data/plantsData";
import aloeVera from "@/assets/plants/aloe-vera.jpg";
import turmeric from "@/assets/plants/turmeric.jpg";
import lavender from "@/assets/plants/lavender.jpg";
import ginger from "@/assets/plants/ginger.jpg";
import peppermint from "@/assets/plants/peppermint.jpg";
import chamomile from "@/assets/plants/chamomile.jpg";

const imageMap: Record<string, string> = {
  "aloe-vera": aloeVera,
  "turmeric": turmeric,
  "lavender": lavender,
  "ginger": ginger,
  "peppermint": peppermint,
  "chamomile": chamomile,
};

interface PlantCardProps {
  plant: Plant;
}

export const PlantCard = ({ plant }: PlantCardProps) => {
  return (
    <Link to={`/plants/${plant.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="aspect-square overflow-hidden bg-muted">
          <img 
            src={imageMap[plant.image]} 
            alt={plant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {plant.name}
          </CardTitle>
          <CardDescription className="italic text-sm">
            {plant.scientificName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            {plant.category.slice(0, 2).map((cat) => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {plant.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
