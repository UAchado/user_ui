import React from 'react';
import Dropdown from "../NewItem/Dropdown/dropdown.tsx";
import {ItemType} from "../../types/ItemType.ts";

interface DashboardTableProps {
    openItemDetails: (item: ItemType) => void;
    handleSelect: (item: ItemType) => void;
    tags: string[];
    handleSelectTag: (tag: string) => void;
    toggleSelectedState: () => void;
    filteredItems: ItemType[];
}
export const DashboardTable: React.FC<DashboardTableProps> = (
    {
        openItemDetails,
        handleSelect,
        tags,
        handleSelectTag,
        toggleSelectedState,
        filteredItems
    }
) => {

    return (
        <div className="sm:w-[55vw] overflow-x-auto p-10">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Tag</th>
                    <th>Admitido em</th>
                    <th> Ponto de Recolha</th>
                    <th>
                        <Dropdown items={tags} onSelect={handleSelectTag}/>
                    </th>
                    <th>
                        <button onClick={toggleSelectedState} className="btn btn-accent btn-block mt-7">
                            Alternar Ativos/Arquivados
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody className='text-xl'>
                {filteredItems.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="w-12 h-12 mask mask-squircle">
                                        <img src={item.image} alt="Avatar Tailwind CSS Component"/>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="flex items-center space-x-2">
                                <span className="badge badge-ghost badge-md">{item.tag}</span>
                            </div>
                        </td>
                        <td>{new Date(item.admittedAt).toLocaleDateString()}</td>
                        <td></td>
                        <td>
                            <button
                                className="btn btn-ghost border-primary-content"
                                onClick={() => openItemDetails(item)}
                            >
                                Detalhes
                            </button>
                        </td>
                        <td>
                            <button
                                className="btn btn-neutral"
                                onClick={() => handleSelect(item)}
                            >
                                Marcar como encontrado
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>


    );
}