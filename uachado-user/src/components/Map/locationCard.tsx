import React from "react";

interface LocationCardProps {
  location: {
    name: string;
    location: string;
    photo: string;
  };
  onOpenModal: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onOpenModal }) => {
  return (
      <div className="card bg-secondary-focus">
        <figure className="h-40 overflow-hidden">
          <img src={location.photo} alt={location.name} className="object-cover w-full h-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl sm:text-2xl mx-auto">{location.name}</h2>
          <p className="text-xs">{location.location}</p>
          <div className="card-actions">
            <button
                className="btn btn-accent btn-block text-xs sm:text-md"
                onClick={onOpenModal}
            >
              Ver Localização
            </button>
          </div>
        </div>
      </div>
  );
};

export default LocationCard;
