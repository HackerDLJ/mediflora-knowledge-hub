import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DatabasePlant } from "@/types/plant";
import { PlantCard } from "./PlantCard";

export const DiseaseSuggestion = () => {
  const [disease, setDisease] = useState("");
  const [suggestions, setSuggestions] = useState<DatabasePlant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const getSuggestions = async () => {
    if (!disease.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a disease or symptom.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('suggest-plants', {
        body: { disease: disease.trim() }
      });

      if (error) {
        throw error;
      }

      if (data?.suggestions && data.suggestions.length > 0) {
        setSuggestions(data.suggestions);
        toast({
          title: "Suggestions Found!",
          description: `Found ${data.suggestions.length} plant(s) that may help with ${disease}.`,
        });
      } else {
        setSuggestions([]);
        toast({
          title: "No Matches Found",
          description: "Try different symptoms or check our full plant database.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to get plant suggestions. Please try again.",
        variant: "destructive",
      });
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      getSuggestions();
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">AI Plant Suggestions</CardTitle>
          </div>
          <CardDescription className="text-base">
            Enter a disease or symptom to get personalized medicinal plant recommendations powered by AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="e.g., headache, inflammation, digestive issues..."
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button 
              onClick={getSuggestions} 
              disabled={isLoading}
              size="lg"
              className="min-w-[140px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Suggestions
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {hasSearched && !isLoading && (
        <div>
          {suggestions.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Recommended Plants for "{disease}"
                </h2>
                <p className="text-muted-foreground">
                  {suggestions.length} plant{suggestions.length !== 1 ? 's' : ''} found that may help with your condition.
                  <span className="block mt-1 text-sm">⚠️ Always consult healthcare professionals before use.</span>
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            </>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-lg text-muted-foreground">
                No specific plant matches found for "{disease}". 
                <br />
                Try different keywords or explore our full database.
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};