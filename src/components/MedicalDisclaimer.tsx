import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function MedicalDisclaimer() {
  const { acceptDisclaimer, hasAcceptedDisclaimer } = useAuth();

  if (hasAcceptedDisclaimer) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Alert variant="destructive" className="border-2">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-xl font-bold mb-4">
            Medical Information Disclaimer
          </AlertTitle>
          <AlertDescription className="space-y-4 text-base">
            <p className="font-semibold">
              IMPORTANT: Please read and accept this disclaimer before accessing plant information.
            </p>
            
            <div className="space-y-2">
              <p>⚠️ <strong>Not Medical Advice:</strong> The information provided about medicinal plants is for educational purposes only and is not intended as medical advice, diagnosis, or treatment.</p>
              
              <p>⚠️ <strong>Unverified Content:</strong> While we strive for accuracy, plant information in this database may be unverified or incomplete. Do not rely solely on this information for health decisions.</p>
              
              <p>⚠️ <strong>Consult Healthcare Professionals:</strong> Always consult with qualified healthcare professionals before using any medicinal plants, especially if you have existing medical conditions, are pregnant, or are taking medications.</p>
              
              <p>⚠️ <strong>Plant Identification Risks:</strong> Misidentification of plants can lead to serious health risks or poisoning. Never consume plants based solely on this app's identification.</p>
              
              <p>⚠️ <strong>No Liability:</strong> We assume no liability for any adverse effects from the use or misuse of information provided in this application.</p>
            </div>

            <div className="pt-4 flex gap-3">
              <Button 
                onClick={acceptDisclaimer}
                className="flex-1"
                size="lg"
              >
                I Understand and Accept
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
