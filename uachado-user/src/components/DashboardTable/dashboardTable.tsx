import React from 'react';
import Dropdown from "../NewItem/Dropdown/dropdown.tsx";
import {ItemType} from "../../types/ItemType.ts";

interface DashboardTableProps {
    filteredData: ItemType[];
    openItemDetails: (item: ItemType) => void;
    handleSelect: (item: ItemType) => void;
    tags: string[];
    handleSelectTag: (tag: string) => void;
    isAdmin: boolean;
}
export const DashboardTable: React.FC<DashboardTableProps> = (
    {
        filteredData,
        openItemDetails,
        handleSelect,
        tags,
        handleSelectTag,
        isAdmin
    }
) => {


    return (
        <div className="sm:w-[55vw] overflow-x-auto p-10">
            <h1 className='text-3xl'>Dashboard para: <b>DETI (Sr.Fidalgo)</b></h1>
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Tag</th>
                    {isAdmin ? <th>Admitido em</th> : <th> Ponto de Recolha</th>}
                    {isAdmin && <th></th>}
                    <th>
                        <Dropdown items={tags} onSelect={handleSelectTag}/>
                    </th>
                </tr>
                </thead>
                <tbody className='text-xl'>
                {filteredData.map((item, index) => (
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