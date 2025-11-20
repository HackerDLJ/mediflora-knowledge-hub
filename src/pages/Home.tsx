import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Search, BookOpen, Globe, Leaf } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroBanner} 
            alt="Medicinal plants garden" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/50" />
        </div>
        
        <div className="container relative z-10 px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Discover the Power of <span className="text-primary">Medicinal Plants</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your comprehensive digital database for medicinal flora. Research, learn, and explore trusted information about plants that heal.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/plants">Explore Database</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MediFlora?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform designed for students, researchers, and anyone interested in medicinal plants.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Easy Search</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find plants by name, property, or region with our intuitive search system.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Detailed Information</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Scientific names, properties, uses, dosages, and precautions for each plant.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Regional Data</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Discover where plants grow naturally and their regional availability.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Trusted Source</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Evidence-based information to support education and research.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4">
          <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl mb-4">
                Start Your Journey Today
              </CardTitle>
              <CardDescription className="text-primary-foreground/90 text-lg">
                Access our comprehensive database of medicinal plants and unlock nature's pharmacy.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/plants">Browse All Plants</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 border-t">
        <div className="container px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 MediFlora - Medicinal Plant App | Created by Team "Out of Ideas"
            TeamMates: Luke Jebasundar D (DLJ), Madhavivanesh R, Maharaja G
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
