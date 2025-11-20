import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Target, BookOpen, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About MediFlora
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering education and research through accessible medicinal plant information
            </p>
          </div>

          <div className="space-y-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Target className="h-6 w-6 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg">
                <p className="text-foreground leading-relaxed">
                  MediFlora was created to bridge the gap between traditional botanical knowledge and modern scientific research. 
                  Our mission is to provide students, researchers, and the general public with reliable, accessible, and comprehensive 
                  information about medicinal plants from around the world.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <BookOpen className="h-6 w-6 text-primary" />
                  What We Offer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <div>
                      <strong className="text-foreground">Detailed Plant Profiles:</strong>
                      <p className="text-muted-foreground">Scientific names, medicinal properties, uses, and dosage information</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <div>
                      <strong className="text-foreground">Regional Information:</strong>
                      <p className="text-muted-foreground">Where plants grow naturally and their geographic distribution</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <div>
                      <strong className="text-foreground">Safety Guidelines:</strong>
                      <p className="text-muted-foreground">Precautions, warnings, and contraindications for safe usage</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <div>
                      <strong className="text-foreground">Easy Search & Browse:</strong>
                      <p className="text-muted-foreground">Intuitive interface to find plants by name, property, or category</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Users className="h-6 w-6 text-primary" />
                  Meet the Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Team "Out of Ideas"</h3>
                  <p className="text-muted-foreground mb-4">
                    A passionate group dedicated to making medicinal plant information accessible to everyone
                  </p>
                  <p className="text-foreground">
                    We believe that knowledge about medicinal plants should be freely available to support education, 
                    research, and informed decision-making about natural remedies.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Heart className="h-6 w-6 text-primary" />
                  Our Commitment
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg">
                <p className="text-foreground leading-relaxed mb-4">
                  We are committed to maintaining accurate, evidence-based information and continuously expanding our database. 
                  While we strive for accuracy, we always recommend consulting with qualified healthcare professionals before 
                  using medicinal plants, especially for treating medical conditions.
                </p>
                <p className="text-muted-foreground">
                  MediFlora is designed as an educational resource and should not replace professional medical advice, 
                  diagnosis, or treatment.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/plants">Explore Our Database</Link>
            </Button>
          </div>
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

export default About;
