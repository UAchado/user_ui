import React, {useEffect, useState} from 'react';
import Dropdown from "../NewItem/Dropdown/dropdown.tsx";


export const DashboardTable: React.FC = (props) => {

    const tags = props.tags;
    const data = props.data;
    interface ItemType {
        image: string;
        description: string;
        tag: string;
        dropoffPoint_id: string;
        admittedAt: string;
        isVisible: boolean;
    }

    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
    const [selectedTag, setSelectedTag] = useState("Todos");


    const [filteredData, setFilteredData] = useState<ItemType[]>(data);
    const handleSelect = (item: ItemType) => {
        // Update the visibility of item directly
        setData(prevData => prevData.map(currItem => {
            if (currItem === item) {
                return {...currItem, isVisible: false};
            }
            return currItem;
        }));
    };
    const handleSelectTag = (tag: string) => {
        setSelectedTag(tag);
    };
    const openItemDetails = (item: ItemType) => {
        setSelectedItem(item);
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        modal.showModal();
    }
    useEffect(() => {
        setFilteredData(data.filter(item =>
            (selectedTag === "Todos" ? true : item.tag === selectedTag) && item.isVisible
        ));
    }, [data, selectedTag]);

    useEffect(() => {
        if (selectedItem !== null) {
            const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
            modal.showModal();
        }
    }, [selectedItem]);

    return (
        <div className="sm:w-[55vw] overflow-x-auto p-10">
            <h1 className='text-3xl'>Dashboard para: <b>DETI (Sr.Fidalgo)</b></h1>
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Tag</th>
                    <th>Admitido em</th>
                    <th></th>
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
            {selectedItem && (
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <img src={selectedItem["image"]} alt={selectedItem["description"]}/>
                        <h3 className="text-lg font-bold">{selectedItem["description"]}</h3>
                        <span className="badge badge-ghost badge-md">{selectedItem["tag"]}</span>
                        <h1 className="text-xl font-bold">Guardado em: <b>{selectedItem["dropoffPoint_id"]}</b></h1>
                        <div className="modal-action">
                            <form method="dialog">
                                <button
                                    className="btn"
                                    onClick={() => setSelectedItem(null)}
                                >
                                    Fechar
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </div>


    );
}