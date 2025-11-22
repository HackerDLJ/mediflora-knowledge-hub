import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export function DisclaimerBanner() {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <strong>Educational Content Only:</strong> Information provided is unverified and for educational purposes. 
        Always consult healthcare professionals before using medicinal plants.
      </AlertDescription>
    </Alert>
  );
}
