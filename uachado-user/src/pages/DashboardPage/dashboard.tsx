import { useState, useEffect, useContext } from "react";
import { DashboardTable } from "../../components/DashboardTable/dashboardTable";
import { DashboardContext } from "../../context/DashboardContext/DashboardContext";
import { ItemType } from "../../types/ItemType.ts";
import { DashboardCards } from "../../components/DashboardCards/dashboardCards.tsx";
import axios from "axios";
import Pagination from "../../components/Pagination/pagination.tsx";

const Dashboard = () => {
  const {
    selectedItem,
    setSelectedItem,
    tags,
    setSelectedTag,
    filteredData,
    selectedState,
    toggleSelectedState,
    archiveItem,
    page,
    setPage,
    totalPages,
  } = useContext(DashboardContext);

  interface DropPoint {
    id: number;
    name: string;
    coordinates: string;
    latitude: number;
    longitude: number;
  }

  const pointsBaseUrl = import.meta.env.VITE_POINTS_URL;
  const [dropPoints, setDropoints] = useState<DropPoint[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [modalItem, setModalItem] = useState<ItemType | null>(null);

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
    if (selectedItem !== null) {
      const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
      modal.showModal();
    }
  }, [selectedItem]);

  // This function could be part of your context logic as well
  const openItemDetails = (item: ItemType) => {
    setSelectedItem(item);
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    if (modalItem !== null) {
      const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
      modal.showModal();
    }
  }, [modalItem]);

  const getDropPointName = (
    dropPoints: DropPoint[],
    item: ItemType
  ): string => {
    const filteredPoints = dropPoints.filter((point) => {
      return point.id === item.dropoff_point_id;
    });

    return filteredPoints.length > 0 ? filteredPoints[0].name : "Not Found";
  };

  useEffect(() => {
    const fetchDropPoints = async () => {
      try {
        // Adjust the endpoint as needed
        axios
          .get(pointsBaseUrl + "points/")
          .then(function (response) {
            setDropoints(response.data);
          })
          .catch(function (error) {
            console.error("Error sending data:", error);
          });
      } catch (error) {
        console.error("Error fetching dropPoints:", error);
      }
    };
    fetchDropPoints();
  }, [pointsBaseUrl]);

  const renderTable = windowWidth > 1250;

  function openArchiveModal(item: ItemType): void {
    setModalItem(item);
  }

  const handleArchiveSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modalItem !== null) {
      archiveItem(modalItem, e.currentTarget.email.value);
      setModalItem(null);
    }
  };

  return (
    <div>
      {selectedState === "stored" ? (
        <h2 className="text-2xl font-bold mt-10">Objetos Guardados</h2>
      ) : (
        <h2 className="text-2xl font-bold mt-10">Objetos Arquivados</h2>
      )}
      {renderTable ? (
        <DashboardTable
          openItemDetails={openItemDetails}
          archiveItem={archiveItem}
          tags={tags}
          handleSelectTag={handleSelectTag}
          toggleSelectedState={toggleSelectedState}
          selectedState={selectedState}
          filteredItems={filteredItems}
          openArchiveModal={openArchiveModal}
        />
      ) : (
        <DashboardCards
          openItemDetails={openItemDetails}
          archiveItem={archiveItem}
          tags={tags}
          handleSelectTag={handleSelectTag}
          toggleSelectedState={toggleSelectedState}
          selectedState={selectedState}
          filteredItems={filteredItems}
          openArchiveModal={openArchiveModal}
        />
      )}
      {selectedItem && (
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <img
              src={selectedItem["image"]}
              alt={selectedItem["description"]}
            />
            <h3 className="text-lg font-bold">{selectedItem["description"]}</h3>
            <span className="badge badge-ghost badge-md">
              {selectedItem["tag"]}
            </span>
            <h1 className="text-xl font-bold">
              Guardado em: <b>{getDropPointName(dropPoints, selectedItem)}</b>
            </h1>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => setSelectedItem(null)}>
                  Fechar
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}

      {modalItem && (
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Confirmar Arquivamento</h3>
            <p className="text-sm mb-4">
              Insira o e-mail da pessoa que recolheu o item (preferencialmente
              um e-mail @ua.pt).
            </p>
            <form method="dialog" onSubmit={handleArchiveSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email @ua.pt"
                className="input input-bordered w-full mb-4"
                required
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Confirmar
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setModalItem(null)}
                >
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={(newPage) => setPage(newPage)} />
    </div>
  );
};

export default Dashboard;
