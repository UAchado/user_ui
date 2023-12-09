import { useState, useEffect, useContext } from 'react';
import { DashboardTable } from '../../components/DashboardTable/dashboardTable';
import Dropdown from '../../components/NewItem/Dropdown/dropdown';
import { DashboardContext} from "../../context/DashboardContext/DashboardContext";
import { ItemType} from "../../types/ItemType.ts";

const Dashboard = () => {
    const {
        selectedItem, setSelectedItem,
        tags,
        selectedTag, setSelectedTag,
        data, setData,
        filteredData, setFilteredData
    } = useContext(DashboardContext);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        setFilteredData(data.filter(item =>
            (selectedTag === "Todos" ? true : item.tag === selectedTag) && item.isVisible
        ));
    }, [data, selectedTag, setFilteredData]);

    useEffect(() => {
        if (selectedItem !== null) {
            const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
            modal.showModal();
        }
    }, [selectedItem]);


    // This function could be part of your context logic as well
    const openItemDetails = (item: ItemType) => {
        setSelectedItem(item);
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        modal.showModal();
    }

    const handleSelect = (item : ItemType) => {
        setData(prevData => prevData.map(currItem => {
            if (currItem === item) {
                return { ...currItem, isVisible: false };
            }
            return currItem;
        }));
    };

    const handleSelectTag = (tag : string) => {
        setSelectedTag(tag);
    };

    const renderTable = windowWidth > 1250;
    return (

            <div>
                {renderTable ? (
                        <DashboardTable
                            filteredData={filteredData}
                            openItemDetails={openItemDetails}
                            handleSelect={handleSelect}
                            tags={tags}
                            handleSelectTag={handleSelectTag}
                        />

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