import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface LocationModalProps {
  location: {
    name: string;
    coordinates: string;
    latitude: number;
    longitude: number;
  };
  userLocation: {
    lat: number;
    lng: number;
  } | null;
  onCloseModal: () => void;
  calculateMidpoint: (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => { lat: number; lng: number } | null;
}

const LocationModal: React.FC<LocationModalProps> = ({
  location,
  userLocation,
  onCloseModal,
  calculateMidpoint,
}) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  const [latitudeStr, longitudeStr] = location.coordinates.split(", ");

  // Convert string values to numbers
  location.latitude = parseFloat(latitudeStr);
  location.longitude = parseFloat(longitudeStr);


  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-secondary-focus">
        <h3 className="text-lg font-bold">{location.name}</h3>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            calculateMidpoint(
              userLocation?.lat || 40.631417730224,
              userLocation?.lng || -8.657526476133642,
              location.latitude || 0,
              location.longitude || 0
            ) || {
              lat: location.latitude,
              lng: location.longitude,
            }
          }
          zoom={15}
        >
          {/* Marker Component for selected location */}
          {location && (
            <Marker
              position={{
                lat: location.latitude,
                lng: location.longitude,
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
            <button className="btn bg-secondary" onClick={onCloseModal}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default LocationModal;
