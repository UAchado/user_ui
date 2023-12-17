import React from "react";
import Dropdown from "../NewItem/Dropdown/dropdown.tsx";
import { ItemType } from "../../types/ItemType.ts";

interface DashboardCardsProps {
  openItemDetails: (item: ItemType) => void;
  archiveItem: (item: ItemType, email: string) => void;
  tags: string[];
  handleSelectTag: (tag: string) => void;
  toggleSelectedState: () => void;
  selectedState: string;
  filteredItems: ItemType[];
  openArchiveModal: (item: ItemType) => void;
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({
  openItemDetails,
  tags,
  handleSelectTag,
  toggleSelectedState,
  selectedState,
  filteredItems,
  openArchiveModal,
}) => {
  const canArchive = () => {
    return selectedState !== "retrieved";
  };

  return (
    <div className="grid grid-cols-1 gap-4 m-10 md:grid-cols-2">
      <Dropdown
        items={tags}
        onSelect={handleSelectTag}
        className="md:col-span-2"
      />
      <div className="md:col-span-2 align-middle">
        <span className="label-text">Recolhidos</span>
        <input
          onClick={toggleSelectedState}
          type="checkbox"
          className="toggle toggle-accent  mr-2 ml-2 align-middle "
        />
        <span className="label-text">Arquivados</span>
      </div>
      {filteredItems.map((item: ItemType, index: number) => (
        <div key={index} className="card bg-secondary-focus">
          <figure className="h-40 overflow-hidden">
            <img
              src={item.image}
              alt={item.description}
              className="object-cover w-full h-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl sm:text-2xl mx-auto">
              {item.description}
            </h2>
            <div className="card-actions">
              <button
                className="btn btn-accent btn-block text-xs sm:text-md"
                onClick={() => openItemDetails(item)}
              >
                Ver Detalhes
              </button>
              {canArchive() && (
                <button
                  className={`btn btn-neutral btn-block`}
                  onClick={() => openArchiveModal(item)}
                >
                  Marcar como encontrado
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
