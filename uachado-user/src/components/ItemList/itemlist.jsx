import React, { useState, useEffect } from 'react';

const ItemList = () => {

    const data = [
        {
            image: "https://media.discordapp.net/attachments/852109272262770710/1166749106669113364/image.png?ex=654b9ec8&is=653929c8&hm=aec89d9d26f98897dc949faddfa3537b4c1bebd136e6e8c445268c530a96e059&=&width=2824&height=1392",
            description: "Carteira preta",
            tag: "Carteiras",
            dropoffPoint_id: "1234"
        },
    ];
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (selectedItem !== null) {
            const modal = document.getElementById("my_modal_1");
            modal.showModal();
        }
    }, [selectedItem]);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Tags</th>
                            <th>Pickup Point</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="w-12 h-12 mask mask-squircle">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.description}</div>                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-2">
                                        <span className="badge badge-ghost badge-md">{item.tag}</span>
                                    </div>
                                </td>
                                <td>{item.dropoffPoint_id}</td>
                                <th>
                                    <button
                                        className="p-1 btn btn-ghost border-primary-content btn-xs"
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        Details
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedItem && (
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <img src={selectedItem.image} alt={selectedItem.description} />
                        <h3 className="text-lg font-bold">{selectedItem.description}</h3>
                        <span className="badge badge-ghost badge-md">{selectedItem.tag}</span>
                        <h1 className="text-xl font-bold">Guardado em: <b>{selectedItem.dropoffPoint_id}</b></h1>
                        <div className="modal-action">
                            <form method="dialog">
                                <button
                                    className="btn"
                                    onClick={() => setSelectedItem(null)}
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ItemList;

