import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

type Location = {
  lat: number;
  lng: number;
} | null;



const calculateMidpoint = (lat1: number , lng1: number, lat2: number, lng2: number) => {
if (lat1 == 0 && lng1 != 0 && lat2 != 0 && lng2 != 0) {
    return false;
}


    let dLng = ((lng2 - lng1) * Math.PI) / 180; // Convert degrees to radians

    // Convert latitude and longitude values to radians
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;
    lng1 = (lng1 * Math.PI) / 180;

    let bX = Math.cos(lat2) * Math.cos(dLng);
    let bY = Math.cos(lat2) * Math.sin(dLng);
    let lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY));
    let lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

    // Convert the midpoint's latitude and longitude from radians to degrees
    lat3 = (lat3 * 180) / Math.PI;
    lng3 = (lng3 * 180) / Math.PI;

    return { lat: lat3, lng: lng3 };
};

const DropPoints = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<Location>(null);

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
      <div className="grid grid-cols-1 gap-4 m-10 sm:grid-cols-4">
        {locations.map((loc, index) => (
          <div key={index} className="w-64 card glass">
            <figure>
              <img src={loc.image} alt={loc.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{loc.name}</h2>
              <p>{loc.location}</p>
              <div className="justify-end card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleModalOpen(index)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && isLoaded && !loadError && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="text-lg font-bold">
              {locations[selectedIndex].name}
            </h3>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={
                calculateMidpoint(
                    userLocation?.lat || 0,
                    userLocation?.lng || 0,
                    locations[selectedIndex]?.latitude || 0,
                    locations[selectedIndex]?.longitude || 0
                ) || {
                  lat: locations[selectedIndex]?.latitude,
                  lng: locations[selectedIndex]?.longitude,
                }
              }
              zoom={15}
            >
              {/* Marker Component for selected location */}
              {locations[selectedIndex] && (
                <Marker
                  position={{
                    lat: locations[selectedIndex]?.latitude,
                    lng: locations[selectedIndex]?.longitude,
                  }}
                />
              )}
              {/* Marker Component for user location */}
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 7,
                    fillColor: "#4285F4",
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "white",
                  }}
                />
              )}
            </GoogleMap>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={handleModalClose}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default DropPoints;
