import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PlantCard } from "@/components/PlantCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { plantsData, categories } from "@/data/plantsData";
import { Search } from "lucide-react";

const Plants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Plants");

  const filteredPlants = plantsData.filter((plant) => {
    const matchesSearch = 
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All Plants" || 
      plant.category.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Plant Database</h1>
          <p className="text-lg text-muted-foreground">
            Explore our comprehensive collection of medicinal plants
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, scientific name, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredPlants.length} {filteredPlants.length === 1 ? "plant" : "plants"}
          </p>
        </div>

        {/* Plant Grid */}
        {filteredPlants.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No plants found matching your criteria. Try adjusting your search or filters.
            </p>
          </div>
        )}
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

export default Plants;
