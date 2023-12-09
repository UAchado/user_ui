import React from 'react';
import Dropdown from "../NewItem/Dropdown/dropdown.tsx";
import {ItemType} from "../../types/ItemType.ts";

interface DashboardCardsProps {
    openItemDetails: (item: ItemType) => void;
    handleSelect: (item: ItemType) => void;
    tags: string[];
    handleSelectTag: (tag: string) => void;
    toggleSelectedState: () => void;
    selectedState: string;
    filteredItems: ItemType[];
}

export const DashboardCards: React.FC<DashboardCardsProps> = (
    {
        openItemDetails,
        handleSelect,
        tags,
        handleSelectTag,
        toggleSelectedState,
        selectedState,
        filteredItems
    }
) => {
    const canArchive = () => {
        return selectedState === "archived";
    }


    return (
        <div className="grid grid-cols-1 gap-4 m-10 md:grid-cols-2">
            <Dropdown items={tags} onSelect={handleSelectTag} className="md:col-span-2"/>
            <button onClick={toggleSelectedState} className="btn btn-accent btn-block">
                Alternar Ativos/Arquivados
            </button>
            {filteredItems.map((item: ItemType, index: number) => (
                <div
                    key={index}
                    className="card bg-secondary-focus"
                >
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
                        <p className="text-sm">
                            {new Date(item.admittedAt).toLocaleDateString()}
                        </p>
                        <div className="card-actions">
                            <button className="btn btn-accent btn-block text-xs sm:text-md"
                                    onClick={() => openItemDetails(item)}
                            >
                                Ver Detalhes
                            </button>
                            {canArchive() &&
                                <button
                                    className={`btn btn-neutral btn-block`}
                                    onClick={() => handleSelect(item)}
                                >
                                    Marcar como encontrado
                                </button>
                            }

                        </div>
                    </div>
                </div>
            ))}
        </div>


    );
}





