import { useState, useEffect } from 'react';
import Dropdown from '../NewItem/form/dropdown';

const Dashboard = () => {

    const [data, setData] = useState([

        {
            "image": "https://media.discordapp.net/attachments/852109272262770710/1166749106669113364/image.png",
            "description": "Carteira preta",
            "tag": "Carteiras",
            "dropoffPoint_id": "Cantina de Santiago",
            "admittedAt": "2021-04-01T00:00:00.000Z",
            "isVisible": true,
        },
        {
            "image": "https://www.lenovo.com/medias/lenovo-laptop-yoga-slim-series-feature-2-1.png?context=bWFzdGVyfC9lbWVhL2ltYWdlcy98NjkxMzczfGltYWdlL3BuZ3wvZW1lYS9pbWFnZXMvaDgyL2gzZC8xNTg4MTY4MTk5Mzc1OC5wbmd8OWUxZWI4ZTBjZjRhYTNiN2E2YmZlODEyOTAzYjdmOTc4NTE0ZTdiM2IwMGQ0YzI3MzI0NjVkM2I0NTBmY2U5MA",
            "description": "Notebook ultrafino",
            "tag": "Portáteis",
            "dropoffPoint_id": "Reitoria",
            "admittedAt": "2021-05-01T00:00:00.000Z",
            "isVisible": true,
        },
        {
            "image": "https://www.tek4life.pt/media/catalog/product/cache/2/image/800x800/85e4522595efc69f496374d01ef2bf13/s/2/s23__lavender_composta_1.png",
            "description": "Smartphone Samsung",
            "tag": "Telemóveis",
            "dropoffPoint_id": "Cantina de Santiago",
            "admittedAt": "2021-06-01T00:00:00.000Z",
            "isVisible": true,
        },
        {
            "image": "https://img.pccomponentes.com/articles/1066/10663343/1111-lenovo-tab-m10-hd-2nd-gen-101-3-32gb-gris.jpg",
            "description": "Tablet Lenovo",
            "tag": "Tablets",
            "dropoffPoint_id": "Cantina do Crasto",
            "admittedAt": "2021-07-01T00:00:00.000Z",
            "isVisible": true,
        },
        {
            "image": "https://nanochip.pt/wp-content/uploads/Produtos/JBLT520BTAZUL/headphone-jbl-tune-t520-5-3-le-bluetooth-azul-0.jpg",
            "description": "Auscultadores JBL",
            "tag": "Auscultadores/Fones",
            "dropoffPoint_id": "Cantina do Crasto",
            "admittedAt": "2021-08-01T00:00:00.000Z",
            "isVisible": true,
        },
        {
            "image": "https://www.worten.pt/i/370d3f3ddc5f01b5fb58963e70730d74e5d61626.jpg",
            "description": "Carregador portátil universal",
            "tag": "Carregadores",
            "dropoffPoint_id": "CP",
            "admittedAt": "2021-08-01T00:00:00.000Z",
            "isVisible": true,
        }

    ]
    );

    const tags = [
        "Todos",
        "Portáteis",
        "Telemóveis",
        "Tablets",
        "Auscultadores/Fones",
        "Carregadores",
        "Pen drives",
        "Câmaras",
        "Livros",
        "Cadernos",
        "Material de escritório",
        "Carteiras",
        "Chaves",
        "Cartão",
        "Óculos",
        "Joalharia",
        "Casacos",
        "Chapéus/Bonés",
        "Cachecóis",
        "Luvas",
        "Mochilas",
        "Equipamento desportivo",
        "Garrafas de água",
        "Guarda-chuvas",
        "Instrumentos musicais",
        "Material de arte",
        "Bagagem",
        "Produtos de maquilhagem",
        "Artigos de higiene",
        "Medicamentos",
    ];
    // Rename the state variable to itemsData
    const [selectedTag, setSelectedTag] = useState("Todos");
    const [selectedItem, setSelectedItem] = useState(null);
    const [filteredData, setFilteredData] = useState(data.filter(item =>
        (selectedTag === "Todos" ? true : item.tag === selectedTag) && item.isVisible
    ));

    // Track selected items using their index or a unique identifier
    const [selectedIndices, setSelectedIndices] = useState(new Set());

    // Handle checkbox selection
    const handleCheckboxChange = (index) => {
        setSelectedIndices(prevIndices => {
            const newIndices = new Set(prevIndices);
            if (newIndices.has(index)) {
                newIndices.delete(index);
            } else {
                newIndices.add(index);
            }
            return newIndices;
        });
    };
    const handleSelectTag = (tag: string) => {
        setSelectedTag(tag);
    };

    const removeSelectedItems = () => {
        // Update data directly
        setData(prevData => prevData.map((item, index) => ({
            ...item,
            isVisible: selectedIndices.has(index) ? false : item.isVisible
        })));

        setSelectedIndices(new Set()); // Reset selected indices
    };

    useEffect(() => {
        if (selectedItem !== null) {
            const modal: any = document.getElementById("my_modal_1");
            modal.showModal();
        }
    }, [selectedItem]);
    // This useEffect will automatically update filteredData when data or selectedTag changes
    useEffect(() => {
        setFilteredData(data.filter(item =>
            (selectedTag === "Todos" ? true : item.tag === selectedTag) && item.isVisible
        ));
    }, [data, selectedTag]);

    // Filter the itemsData based on the selected tag

    return (
        <div>
            <div className="sm:w-[55vw] overflow-x-auto p-10">
                {/* Button for marking items as found */}
                <button
                    className={`btn ${selectedIndices.size > 0 ? 'bg-primary' : 'btn-disabled'}`}
                    onClick={() => selectedIndices.size > 0 && document.getElementById('my_modal_5').showModal()}
                >
                    Marcar Itens como Encontrados
                </button>

                {/* New modal for confirming item removal */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Marcar itens como encontrados?</h3>
                        <div className="modal-action">
                            <form method="dialog">
                                <button
                                    className="btn"
                                    onClick={removeSelectedItems}
                                >
                                    Marcar
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <h1 className='text-3xl'>Dashboard para: <b>DETI</b></h1>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Tag</th>
                            <th>Admitido em</th>
                            <th>
                                <Dropdown items={tags} onSelect={handleSelectTag} />
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-xl'>
                        {filteredData.map((item, index) => (
                            console.log(filteredData),
                            <tr key={index}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="w-12 h-12 mask mask-squircle">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-2">
                                        <span className="badge badge-ghost badge-md">{item.tag}</span>
                                    </div>
                                </td>
                                <td>{new Date(item.admittedAt).toLocaleDateString()}</td>
                                <th>
                                    <button
                                        className="btn btn-ghost border-primary-content"
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        Detalhes
                                    </button>
                                </th>
                                <th>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={selectedIndices.has(index)}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
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
                                    Fechar
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}

            {/* New modal for confirming item removal */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Marcar itens como encontrados?</h3>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn"
                                onClick={removeSelectedItems}
                            >
                                Marcar
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Dashboard;