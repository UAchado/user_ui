import { useState, useEffect, useContext } from "react";
import { DashboardTable } from "../../components/DashboardTable/dashboardTable";
import { DashboardContext } from "../../context/DashboardContext/DashboardContext";
import { ItemType } from "../../types/ItemType.ts";
import { DashboardCards } from "../../components/DashboardCards/dashboardCards.tsx";

const Dashboard = () => {
  const {
    selectedItem,
    setSelectedItem,
    tags,
    selectedTag,
    setSelectedTag,
    data,
    setData,
    filteredData,
    setFilteredData,
  } = useContext(DashboardContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedState, setSelectedState] = useState<string>("stored"); // Initial state is set to 'stored'
  let isDataLoaded = tags.length > 0 && data.length > 0;

  const toggleSelectedState = () => {
    setSelectedState((prevState) =>
      prevState === "stored" ? "archived" : "stored"
    );
  };
  const filteredItems = filteredData.filter(
    (item) => item.state === selectedState
  );
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    setFilteredData(
      data.filter(
        (item) =>
          (selectedTag === "Todos" ? true : item.tag === selectedTag) &&
          item.isVisible
      )
    );
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
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal.showModal();
  };

  const handleSelect = (item: ItemType) => {
    setData((prevData: ItemType[]) =>
      prevData.map((currItem) => {
        if (currItem === item) {
          return { ...currItem, isVisible: false };
        }
        return currItem;
      })
    );
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    isDataLoaded = tags.length > 0 && data.length > 0;
  }, [tags, data]);

  const renderTable = windowWidth > 1250;
  return (
    <div>
      {isDataLoaded ? (
        <>
          {selectedState === "stored" ? (
            <h2 className="text-2xl font-bold mt-10">Objetos Guardados</h2>
          ) : (
            <h2 className="text-2xl font-bold mt-10">Objetos Arquivados</h2>
          )}

          {renderTable ? (
            <DashboardTable
              openItemDetails={openItemDetails}
              handleSelect={handleSelect}
              tags={tags}
              handleSelectTag={handleSelectTag}
              toggleSelectedState={toggleSelectedState}
              selectedState={selectedState}
              filteredItems={filteredItems}
            />
          ) : (
            <DashboardCards
              openItemDetails={openItemDetails}
              handleSelect={handleSelect}
              tags={tags}
              handleSelectTag={handleSelectTag}
              toggleSelectedState={toggleSelectedState}
              selectedState={selectedState}
              filteredItems={filteredItems}
            />
          )}
          {selectedItem && (
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <img
                  src={selectedItem["image"]}
                  alt={selectedItem["description"]}
                />
                <h3 className="text-lg font-bold">
                  {selectedItem["description"]}
                </h3>
                <span className="badge badge-ghost badge-md">
                  {selectedItem["tag"]}
                </span>
                <h1 className="text-xl font-bold">
                  Guardado em: <b>{selectedItem["dropoffPoint_id"]}</b>
                </h1>
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
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
