import React from "react";

interface LocationCardProps {
  location: {
    name: string;
    location: string;
    image: string;
  };
  onOpenModal: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onOpenModal }) => {
  return (
    <div className="card bg-secondary-focus">
      <figure>
        <img src={location.image} alt={location.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xs md:text-lg">{location.name}</h2>
        <p className="text-xs md:text-lg">{location.location}</p>
        <div className="card-actions">
          <button
            className="btn btn-warning btn-block text-xs sm:text-md"
            onClick={onOpenModal}
          >
            View Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
