import React, { useEffect, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import LocationCard from "../../components/Map/locationCard";
import LocationModal from "../../components/Map/locationModal";
import axios from "axios";

const DropPoints: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const pointsBaseUrl = import.meta.env.VITE_POINTS_URL;
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  //console.log("Points URL:", pointsBaseUrl + "points/");
  // Make a GET request to the points API

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY, // Make sure you use your API key here
  });

  useEffect(() => {
    // Get user's current location
    const interval = setInterval(() => {
    }, 5000);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("User's location:", position.coords.latitude, position.coords.longitude);
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

    axios
    .get(pointsBaseUrl + "points/")
    .then((response) => {
      // Handle the successful response here
      //console.log("Points API response:", response.data);
      console.log("Points API response:", response.data);
      setLocations(response.data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
    });

    return () => clearInterval(interval);
  }, []);

  const handleModalOpen = (index: number) => {
    console.log(locations[index]);
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const calculateMidpoint = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): { lat: number; lng: number } | null => {

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

  return (
    <>
      <div className="grid grid-cols-1 gap-4 m-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {locations.map((loc, index) => (
          <LocationCard
            key={index}
            location={loc}
            onOpenModal={() => handleModalOpen(index)}
          />
        ))}
      </div>
      {isModalOpen && isLoaded && !loadError && locations.length > 0 && selectedIndex >= 0 && selectedIndex < locations.length && (
        <LocationModal
          location={locations[selectedIndex]}
          userLocation={userLocation}
          onCloseModal={handleModalClose}
          calculateMidpoint={calculateMidpoint}
        />
      )}
    </>
  );
};

export default DropPoints;
