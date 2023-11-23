import React, { useEffect, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import LocationCard from "./Location/locationCard";
import LocationModal from "./Location/locationModal";

const DropPoints: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY, // Make sure you use your API key here
  });

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

  const handleModalOpen = (index: number) => {
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

  const locations = [
    {
      name: "Reitoria",
      location: "Departamento 25",
      latitude: 40.631417730224,
      longitude: -8.657526476133642,
      image:
        "https://api-assets.ua.pt/v1/image/resizer?imageUrl=https%3A%2F%2Fuaonline.ua.pt%2Fupload%2Fimg%2Fjoua_i_3090.jpg&width=1200",
    },
    {
      name: "CP",
      location: "Departamento 23",
      latitude: 40.62957166653202,
      longitude: -8.655231694880136,
      image:
        "https://api-assets.ua.pt/v1/image/resizer?imageUrl=https%3A%2F%2Fapi-assets.ua.pt%2Ffiles%2Fimgs%2F000%2F001%2F838%2Foriginal.jpg&width=1200",
    },
    {
      name: "DETI",
      location: "Departamento 4",
      latitude: 40.63331148617483,
      longitude: -8.659589862642955,
      image: "https://api-assets.ua.pt/files/imgs/000/000/380/original.jpg",
    },
    {
      name: "Cantina de Santiago",
      location: "Departamento 6",
      latitude: 40.630659968175124,
      longitude: -8.659097986459223,
      image:
        "https://api-assets.ua.pt/v1/image/resizer?imageUrl=https%3A%2F%2Fuaonline.ua.pt%2Fupload%2Fimg%2Fjoua_i_12306.jpg&width=1200",
    },
    {
      name: "Cantina do Crasto",
      location: "Departamento M",
      latitude: 40.62450887522072,
      longitude: -8.656864475040406,
      image:
        "https://api-assets.ua.pt/v1/image/resizer?imageUrl=https%3A%2F%2Fuaonline.ua.pt%2Fupload%2Fimg%2Fjoua_i_2828.JPG&width=1200",
    },
    {
      name: "Pavilhão Aristides Hall",
      location: "Departamento E",
      latitude: 40.63000326980208,
      longitude: -8.654180591479575,
      image:
        "https://d1bvpoagx8hqbg.cloudfront.net/originals/bem-vindos-a-ua-399bd8560914b519d0dca3fc57bd0afe.jpg",
    },
  ];

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
      {isModalOpen && isLoaded && !loadError && (
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
