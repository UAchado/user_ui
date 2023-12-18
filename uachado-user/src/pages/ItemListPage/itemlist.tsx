import { useState, useEffect, useContext } from "react";
import Dropdown from "../../components/NewItem/Dropdown/dropdown";
import Modal from "../../components/ItemDetails/ItemDetails";
import LocationModal from "../../components/Map/locationModal";
import axios from "axios";
import { useJsApiLoader } from "@react-google-maps/api";
import { ItemListContext } from "../../context/ItemListContext/ItemListContext";
import { ItemType } from "../../types/ItemType";
import Pagination from "../../components/Pagination/pagination";
import "@fortawesome/fontawesome-free/css/all.css";

const ItemList = () => {
  const {
    selectedItem,
    setSelectedItem,
    tags,
    selectedTag,
    setSelectedTag,
    filteredData,
    page,
    setPage,
    totalPages,
    progress,
  } = useContext(ItemListContext);

  interface DropPoint {
    id: number;
    name: string;
    coordinates: string;
    latitude: number;
    longitude: number;
  }

  const pointsBaseUrl = import.meta.env.VITE_POINTS_URL;
  const [dropPoints, setDropoints] = useState<DropPoint[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    // Call fetchItems with initial page number, e.g., 1
    if (page !== 1 || selectedTag !== "Todos" || selectedItem !== null) {
      setPage(1);
      setSelectedTag("Todos");
      setSelectedItem(null);
    }
  }, [setPage, setSelectedItem, setSelectedTag]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (selectedItem !== null) {
      const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
      modal.showModal();
    }
  }, [selectedItem]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY, // Make sure you use your API key here
  });

  useEffect(() => {
    // Get user's current location
    const interval = setInterval(() => {}, 5000);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
    return () => clearInterval(interval);
  }, []);

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

  const calculateMidpoint = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): { lat: number; lng: number } | null => {
    const dLng = ((lng2 - lng1) * Math.PI) / 180; // Convert degrees to radians

    // Convert latitude and longitude values to radians
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;
    lng1 = (lng1 * Math.PI) / 180;

    const bX = Math.cos(lat2) * Math.cos(dLng);
    const bY = Math.cos(lat2) * Math.sin(dLng);
    let lat3 = Math.atan2(
      Math.sin(lat1) + Math.sin(lat2),
      Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY)
    );
    let lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

    // Convert the midpoint's latitude and longitude from radians to degrees
    lat3 = (lat3 * 180) / Math.PI;
    lng3 = (lng3 * 180) / Math.PI;

    return { lat: lat3, lng: lng3 };
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  const openMapComponent = () => {
    setShowModal(false);
    setShowMap(true);
  };

  const handleSelectedItem = (item: ItemType) => {
    setShowModal(true);
    setSelectedItem(item);
  };

  const onCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
    setShowMap(false); // Make sure to also set the showMap state to false if needed
    // If you're directly manipulating the DOM (which is not recommended in React), you may need to manually close the dialog
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal.close();
  };

  const getDropPointName = (
    dropPoints: DropPoint[],
    item: ItemType
  ): string => {
    const filteredPoints = dropPoints.filter((point) => {
      return point.id === item.dropoff_point_id;
    });

    return filteredPoints.length > 0 ? filteredPoints[0].name : "Not Found";
  };

  const renderTable: boolean = windowWidth > 1250;
  // Style for the progress bar
  const progressStyle: React.CSSProperties = {
    "--value": progress.toString(),
  } as React.CSSProperties;

  // Conditional rendering based on progress
  const renderContent = () => {
    console.log("Progress:", progress);
    if (progress < 100) {
      return (
        <div className="flex justify-center items-center m-20">
          <div
            className="radial-progress text-black"
            style={progressStyle}
            role="progressbar"
          >
            {Math.round(progress)}%
          </div>
        </div>
      );
    } else if (renderTable) {
      return renderTableView();
    } else {
      return renderCardView();
    }
  };

  const renderTableView = () => (
    <div className="sm:w-[55vw] overflow-x-auto p-10">
      <table className="table">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Tag</th>
            <th>Ponto de Recolha</th>
            <th>
              <Dropdown items={tags} onSelect={handleSelectTag} />
            </th>
          </tr>
        </thead>
        <tbody className="text-xl">
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-12 h-12 mask mask-squircle">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.description}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <i className="fas fa-image"></i>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center space-x-2">
                  <span className="badge badge-ghost badge-md">{item.tag}</span>
                </div>
              </td>
              <td>{getDropPointName(dropPoints, item)}</td>
              <td className="flex justify-center items-center">
                <button
                  className="btn btn-ghost border-primary-content"
                  onClick={() => handleSelectedItem(item)}
                >
                  Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCardView = () => (
    <div className="grid grid-cols-1 gap-4 m-10 md:grid-cols-2">
      <Dropdown items={tags} onSelect={handleSelectTag} />
      {filteredData.map((item, index) => (
        <div
          key={index}
          className="card bg-secondary-focus"
          onClick={() => handleSelectedItem(item)}
        >
          <figure className="h-40 overflow-hidden">
            {item.image ? (
              <img
                src={item.image}
                alt={item.description}
                className="object-cover w-full h-full"
              />
            ) : (
              <i className="fas fa-image"></i>
            )}
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl sm:text-2xl mx-auto">
              {item.description}
            </h2>
            <div className="card-actions">
              <button className="btn btn-accent btn-block text-xs sm:text-md">
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {renderContent()}
      {showModal && selectedItem && (
        <Modal
          selectedItem={selectedItem}
          droppoints={dropPoints}
          onOpenOtherComponent={openMapComponent}
          onCloseModal={onCloseModal}
        />
      )}

      {showMap &&
        selectedItem &&
        isLoaded &&
        !loadError &&
        progress === 100 && (
          <LocationModal
            location={
              dropPoints.filter(
                (point) => point.id === selectedItem?.dropoff_point_id
              )[0]
            }
            userLocation={userLocation}
            onCloseModal={() => setShowMap(false)}
            calculateMidpoint={calculateMidpoint}
          />
        )}
      {progress === 100 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default ItemList;
