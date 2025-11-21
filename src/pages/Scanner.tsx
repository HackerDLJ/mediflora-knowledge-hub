import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DatabasePlant } from "@/types/plant";
import { PlantCard } from "@/components/PlantCard";
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [results, setResults] = useState<DatabasePlant[]>([]);
  const [confidence, setConfidence] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 1280, height: 720 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Camera error:", error);
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to scan plants.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
        identifyPlant(imageData);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);
        identifyPlant(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const identifyPlant = async (imageData: string) => {
    setIsScanning(true);
    setResults([]);
    
    try {
      // Load the image classification model
      const classifier = await pipeline(
        'image-classification',
        'google/vit-base-patch16-224',
        { device: 'webgpu' }
      );

      // Run classification
      const predictions = await classifier(imageData, { top_k: 5 });
      
      console.log("Predictions:", predictions);
      
      // Extract plant-related keywords from predictions
      const predArray = Array.isArray(predictions) ? predictions : [predictions];
      const plantKeywords = predArray
        .map((pred: any) => pred.label.toLowerCase())
        .join(' ');

      // Search our database for matching plants
      const { data: plants, error } = await supabase
        .from('plants')
        .select('*')
        .or(`name.ilike.%${plantKeywords}%,scientific_name.ilike.%${plantKeywords}%,description.ilike.%${plantKeywords}%`)
        .limit(5);

      if (error) throw error;

      if (plants && plants.length > 0) {
        setResults(plants);
        const firstPred: any = predArray[0];
        setConfidence(firstPred?.score ? firstPred.score * 100 : 0);
        toast({
          title: "Plant Identified!",
          description: `Found ${plants.length} potential matches in our database.`,
        });
      } else {
        // If no exact matches, show top plants with general categories
        const { data: topPlants, error: topError } = await supabase
          .from('plants')
          .select('*')
          .limit(5);
        
        if (topError) throw topError;
        
        setResults(topPlants || []);
        const firstPred: any = predArray[0];
        setConfidence(firstPred?.score ? firstPred.score * 100 : 0);
        toast({
          title: "Identification Complete",
          description: "Here are some possible matches from our database.",
        });
      }
    } catch (error) {
      console.error("Identification error:", error);
      toast({
        title: "Identification Failed",
        description: "Could not identify the plant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const resetScanner = () => {
    setCapturedImage(null);
    setResults([]);
    setConfidence(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Plant Scanner</h1>
          <p className="text-lg text-muted-foreground">
            Use your camera or upload an image to identify medicinal plants
          </p>
        </div>

        {/* Camera/Upload Section */}
        {!capturedImage && (
          <Card className="p-8 mb-8">
            <div className="flex flex-col items-center gap-6">
              {isCameraActive ? (
                <div className="relative w-full max-w-2xl">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-lg"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="flex gap-4 justify-center mt-4">
                    <Button onClick={captureImage} size="lg">
                      <Camera className="mr-2 h-5 w-5" />
                      Capture Photo
                    </Button>
                    <Button onClick={stopCamera} variant="outline" size="lg">
                      <X className="mr-2 h-5 w-5" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center space-y-4">
                    <Camera className="h-24 w-24 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Start your camera or upload an image to begin
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={startCamera} size="lg">
                      <Camera className="mr-2 h-5 w-5" />
                      Open Camera
                    </Button>
                    
                    <label>
                      <Button variant="outline" size="lg" asChild>
                        <span>
                          <Upload className="mr-2 h-5 w-5" />
                          Upload Image
                        </span>
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Captured Image & Results */}
        {capturedImage && (
          <div className="space-y-8">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <img
                    src={capturedImage}
                    alt="Captured plant"
                    className="w-full rounded-lg"
                  />
                </div>
                
                <div className="md:w-1/2 flex flex-col justify-center">
                  {isScanning ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Loader2 className="h-12 w-12 animate-spin text-primary" />
                      <p className="text-lg text-muted-foreground">
                        Analyzing plant image...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          Identification Results
                        </h3>
                        <p className="text-muted-foreground">
                          Confidence: {confidence.toFixed(1)}%
                        </p>
                      </div>
                      
                      <Button onClick={resetScanner} variant="outline">
                        <Camera className="mr-2 h-4 w-4" />
                        Scan Another Plant
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Results Grid */}
            {results.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Possible Matches ({results.length})
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((plant) => (
                    <PlantCard key={plant.id} plant={plant} />
                  ))}
                </div>
              </div>
            )}
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

export default Scanner;
