import {useState, useEffect} from 'react';
import {DashboardTable} from '../../components/DashboardTable/dashboardTable';
import Dropdown from '../../components/NewItem/Dropdown/dropdown';

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
    type ItemType = {
        image: string;
        description: string;
        tag: string;
        dropoffPoint_id: string;
        admittedAt: string;
        isVisible: boolean;
    };
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
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
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderTable: boolean = windowWidth > 1250;

    const openItemDetails = (item: ItemType) => {
        setSelectedItem(item);
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        modal.showModal();
    }
    return (
        <div>
            {renderTable ? (
                <DashboardTable data={data} setData={setData} setSelectedItem={setSelectedItem}/>

                ) :
                (
                    <div className="grid grid-cols-1 gap-4 m-10 md:grid-cols-2">
                        <Dropdown items={tags} onSelect={handleSelectTag} className="md:col-span-2"/>
                        {filteredData.map((item, index) => (
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
                                    <p className="text-xs">
                                        {item.dropoffPoint_id}
                                    </p>
                                    <div className="card-actions">
                                        <button className="btn btn-accent btn-block text-xs sm:text-md"
                                                onClick={() => openItemDetails(item)}
                                        >
                                            Ver Detalhes
                                        </button>
                                        <button
                                            className="btn btn-neutral btn-block"
                                            onClick={() => handleSelect(item)}
                                        >
                                            Marcar como encontrado
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
};

export default Dashboard;