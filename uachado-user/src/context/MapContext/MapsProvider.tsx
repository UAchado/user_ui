import React, { useEffect, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api"; // Assuming you are using the `@react-google-maps/api` package
import { MapsContext } from "./MapsContext";

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

interface MapsProviderProps {
  children: React.ReactNode;
}

const MapsProvider: React.FC<MapsProviderProps> = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY, // Make sure you use your API key here
  });

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
  }, []);

  const calculateMidpoint = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): { lat: number; lng: number } | null => {
    if (lat1 === 0 && lng1 !== 0 && lat2 !== 0 && lng2 !== 0) {
        return null;
      }
  
      let dLng = ((lng2 - lng1) * Math.PI) / 180; // Convert degrees to radians
  
      // Convert latitude and longitude values to radians
      lat1 = (lat1 * Math.PI) / 180;
      lat2 = (lat2 * Math.PI) / 180;
      lng1 = (lng1 * Math.PI) / 180;
  
      let bX = Math.cos(lat2) * Math.cos(dLng);
      let bY = Math.cos(lat2) * Math.sin(dLng);
      let lat3 = Math.atan2(
        Math.sin(lat1) + Math.sin(lat2),
        Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY)
      );
      let lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);
  
      // Convert the midpoint's latitude and longitude from radians to degrees
      lat3 = (lat3 * 180) / Math.PI;
      lng3 = (lng3 * 180) / Math.PI;
  
      return { lat: lat3, lng: lng3 };
  };

  const contextValue: MapsContextType  = {
    isLoaded,
    loadError,
    userLocation,
    calculateMidpoint,
  };

  return (
    <MapsContext.Provider value={contextValue}>{children}</MapsContext.Provider>
  );
};

export default MapsProvider;
