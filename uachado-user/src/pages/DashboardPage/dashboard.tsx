
import {useState, useEffect, useContext} from 'react';
import {DashboardTable} from '../../components/DashboardTable/dashboardTable';
import {DashboardContext} from "../../context/DashboardContext/DashboardContext";
import {ItemType} from "../../types/ItemType.ts";
import {DashboardCards} from "../../components/DashboardCards/dashboardCards.tsx";

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
        setFilteredData(data.filter((item: { tag: never; isVisible: never; }) =>
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

    const handleSelect = (item: ItemType) => {
        setData((prevData: ItemType[]) => prevData.map(currItem => {
            if (currItem === item) {
                return {...currItem, isVisible: false};
            }
            return currItem;
        }));
    };

    const handleSelectTag = (tag: string) => {
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
                    <DashboardCards
                        filteredData={filteredData}
                        openItemDetails={openItemDetails}
                        handleSelect={handleSelect}
                        tags={tags}
                        handleSelectTag={handleSelectTag}

                    />
                )
            }
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