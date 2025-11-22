import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, AlertTriangle, MapPin, Pill, Leaf, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DatabasePlant, getPlantImage } from "@/types/plant";
import { useToast } from "@/hooks/use-toast";

const PlantDetail = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState<DatabasePlant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPlant();
  }, [id]);

  const fetchPlant = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("plants")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      setPlant(data);
      
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error fetching plant:", error);
      }
      toast({
        title: "Error loading plant",
        description: "Failed to load plant details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <MedicalDisclaimer />
        <div className="container px-4 py-12 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <MedicalDisclaimer />
        <div className="container px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Plant Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The plant you're looking for doesn't exist in our database.
          </p>
          <Button asChild>
            <Link to="/plants">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plants
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <MedicalDisclaimer />
      
      <div className="container px-4 py-8">
        <DisclaimerBanner />
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/plants">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plants
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img 
                src={getPlantImage(plant)} 
                alt={plant.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Basic Info Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{plant.name}</h1>
              <p className="text-xl italic text-muted-foreground mb-4">{plant.scientific_name}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {plant.category?.map((cat) => (
                  <Badge key={cat} variant="secondary">
                    {cat}
                  </Badge>
                ))}
              </div>
              <p className="text-lg text-foreground leading-relaxed">{plant.description}</p>
            </div>

            {plant.regions && plant.regions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Regional Availability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plant.regions.map((region, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {region}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {plant.medicinal_properties && plant.medicinal_properties.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Medicinal Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plant.medicinal_properties.map((prop, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {prop}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {(plant.traditional_uses || plant.scientific_uses) && 
           (plant.traditional_uses?.length || plant.scientific_uses?.length) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  Common Uses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plant.traditional_uses?.map((use, index) => (
                    <li key={`trad-${index}`} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {use}
                    </li>
                  ))}
                  {plant.scientific_uses?.map((use, index) => (
                    <li key={`sci-${index}`} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {use}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {plant.dosage && (
            <Card>
              <CardHeader>
                <CardTitle>Recommended Dosage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{plant.dosage}</p>
              </CardContent>
            </Card>
          )}

          {plant.precautions && plant.precautions.length > 0 && (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Precautions & Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plant.precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{precaution}</span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <p className="text-sm text-muted-foreground">
                  <strong>Important:</strong> Always consult with a qualified healthcare provider before using medicinal plants, especially if you have pre-existing conditions or are taking medications.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <footer className="bg-muted py-8 border-t mt-16">
        <div className="container px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 MediFlora - Medicinal Plant App | Created by Team "Out of Ideas"
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PlantDetail;
