-- Fix database function security by adding fixed search_path
-- This prevents privilege escalation through search_path manipulation

CREATE OR REPLACE FUNCTION public.update_plants_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;