import React, { useState } from "react";

interface LocationCardProps {
  location: {
    name: string;
    location: string;
    image: string;
  };
  onOpenModal: () => void;
}

let cardIdCounter = 0; // Initialize the counter

const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onOpenModal,
}) => {
  const [cardId] = useState(() => {
    cardIdCounter++; // Increment the counter by 1 for each component
    return cardIdCounter;
  });

  return (
    <div className="card bg-secondary-focus" id={`card-${cardId}`}>
      <figure className="h-40 overflow-hidden">
        <img
          src={location.image}
          alt={location.name}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl sm:text-2xl mx-auto">
          {location.name}
        </h2>
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
