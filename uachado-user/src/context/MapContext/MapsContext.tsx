import { createContext} from "react";

interface MapsContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
  userLocation: { lat: number; lng: number } | null;
  calculateMidpoint: (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => { lat: number; lng: number } | null;
}

export const MapsContext = createContext<MapsContextType | undefined>(undefined);
