import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DatabasePlant, getPlantImage } from "@/types/plant";

interface PlantCardProps {
  plant: DatabasePlant;
}

export const PlantCard = ({ plant }: PlantCardProps) => {
  return (
    <Link to={`/plants/${plant.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="aspect-square overflow-hidden bg-muted">
          <img 
            src={getPlantImage(plant)} 
            alt={plant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {plant.name}
          </CardTitle>
          <CardDescription className="italic text-sm">
            {plant.scientific_name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            {plant.category?.slice(0, 2).map((cat) => (
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
