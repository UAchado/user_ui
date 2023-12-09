import {useState, useEffect} from "react";
import Dropdown from "../../components/NewItem/Dropdown/dropdown";
import Modal from "../../components/ItemDetails/ItemDetails";
import LocationModal from "../../components/Map/locationModal";
import axios from "axios";
import {useJsApiLoader} from "@react-google-maps/api";

const ItemList = () => {
    interface DropPoint {
        id: number;
        name: string;
        coordinates: string;
        latitude: number;
        longitude: number;
    }

    const itemsBaseUrl = import.meta.env.VITE_INVENTORY_URL;
    const pointsBaseUrl = import.meta.env.VITE_POINTS_URL;
    const [tags, setTags] = useState<string[]>([]);
    const [dropPoints, setDropoints] = useState<DropPoint[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>("Todos");
    const [showMap, setShowMap] = useState(false);
    const [userLocation, setUserLocation] = useState<{
        lat: number;
        lng: number;
    } | null>(null);
    const data = [
        {
            image:
                "https://media.discordapp.net/attachments/852109272262770710/1166749106669113364/image.png",
            description: "Carteira preta",
            tag: "Carteiras",
            dropoffPoint_id: 5,
        },
        {
            image:
                "https://www.lenovo.com/medias/lenovo-laptop-yoga-slim-series-feature-2-1.png?context=bWFzdGVyfC9lbWVhL2ltYWdlcy98NjkxMzczfGltYWdlL3BuZ3wvZW1lYS9pbWFnZXMvaDgyL2gzZC8xNTg4MTY4MTk5Mzc1OC5wbmd8OWUxZWI4ZTBjZjRhYTNiN2E2YmZlODEyOTAzYjdmOTc4NTE0ZTdiM2IwMGQ0YzI3MzI0NjVkM2I0NTBmY2U5MA",
            description: "Notebook ultrafino",
            tag: "Portáteis",
            dropoffPoint_id: 1,
        },
        {
            image:
                "https://www.tek4life.pt/media/catalog/product/cache/2/image/800x800/85e4522595efc69f496374d01ef2bf13/s/2/s23__lavender_composta_1.png",
            description: "Smartphone Samsung",
            tag: "Telemóveis",
            dropoffPoint_id: 4,
        },
        {
            image:
                "https://img.pccomponentes.com/articles/1066/10663343/1111-lenovo-tab-m10-hd-2nd-gen-101-3-32gb-gris.jpg",
            description: "Tablet Lenovo",
            tag: "Tablets",
            dropoffPoint_id: 5,
        },
        {
            image:
                "https://nanochip.pt/wp-content/uploads/Produtos/JBLT520BTAZUL/headphone-jbl-tune-t520-5-3-le-bluetooth-azul-0.jpg",
            description: "Auscultadores JBL",
            tag: "Auscultadores/Fones",
            dropoffPoint_id: 4,
        },
        {
            image:
                "https://www.worten.pt/i/370d3f3ddc5f01b5fb58963e70730d74e5d61626.jpg",
            description: "Carregador portátil universal",
            tag: "Carregadores",
            dropoffPoint_id: 2,
        },
    ];
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const [selectedItem, setSelectedItem] = useState<{
        image: string;
        description: string;
        tag: string;
        dropoffPoint_id: number;
    } | null>(null);

    useEffect(() => {
        if (selectedItem !== null) {
            const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
            modal.showModal();
        }
    }, [selectedItem]);

    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_API_KEY, // Make sure you use your API key here
    });

    useEffect(() => {
        // Get user's current location
        const interval = setInterval(() => {
        }, 5000);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("User's location:", position.coords.latitude, position.coords.longitude);
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
        // Fetch tags from the API
        const fetchTags = async () => {
            try {
                // Adjust the endpoint as needed
                axios
                    .get(itemsBaseUrl + "items/tags/")
                    .then(function (response) {
                        setTags(response.data);
                        console.log("Data fetched successfully:", response.data);
                    })
                    .catch(function (error) {
                        console.error("Error sending data:", error);
                    });
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };
        const fetchDropPoints = async () => {
            try {
                // Adjust the endpoint as needed
                axios
                    .get(pointsBaseUrl + "points/")
                    .then(function (response) {
                        console.log("Points API response:", response.data);
                        setDropoints(response.data);
                    })
                    .catch(function (error) {
                        console.error("Error sending data:", error);
                    });
            } catch (error) {
                console.error("Error fetching dropPoints:", error);
            }
        };
        fetchTags().then(() => console.log("Tags fetched successfully"));
        fetchDropPoints().then(() => console.log("DropPoints fetched successfully"));
    }, [itemsBaseUrl, pointsBaseUrl]);


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

        return {lat: lat3, lng: lng3};
    };

    const handleSelectTag = (tag: string) => {
        setSelectedTag(tag);
    };

    const openMapComponent = () => {
        setShowMap(true);
    };

    // Filter the data based on the selected tag
    const filteredData =
        selectedTag === "Todos"
            ? data
            : data.filter((item) => item.tag === selectedTag);

    const renderTable: boolean = windowWidth > 1250;

    return (
        <div>
            {renderTable ? (
                    <div className="sm:w-[55vw] overflow-x-auto p-10">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>Imagem</th>
                                <th>Tag</th>
                                <th>Ponto de Recolha</th>
                                <th>
                                    <Dropdown items={tags} onSelect={handleSelectTag}/>
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
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center space-x-2">
                                              <span className="badge badge-ghost badge-md">
                                                {item.tag}
                                              </span>
                                        </div>
                                    </td>
                                    <td>
                                        {dropPoints
                                            .filter((point) => point.id === item.dropoffPoint_id)
                                            .map((filteredPoint) => filteredPoint.name)}
                                    </td>
                                    <td className="flex justify-center items-center">
                                        <button
                                            className="btn btn-ghost border-primary-content"
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            Detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )
                : (
                    <div className="grid grid-cols-1 gap-4 m-10 md:grid-cols-2">
                        <Dropdown items={tags} onSelect={handleSelectTag} className="md:col-span-2"/>
                        {filteredData.map((item, index) => (
                            <div
                                key={index}
                                className="card bg-secondary-focus"
                                onClick={() => setSelectedItem(item)}
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
                                        {dropPoints
                                            .filter((point) => point.id === item.dropoffPoint_id)
                                            .map((filteredPoint) => filteredPoint.name)}
                                    </p>
                                    <div className="card-actions">
                                        <button className="btn btn-accent btn-block text-xs sm:text-md">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <h2 className="cursor-pointer hover:underline">
                            <button
                                className="btn btn-ghost hover:underline hover:bg-transparent"
                                onClick={() =>
                                    (
                                        document.getElementById("contacto") as HTMLDialogElement
                                    )?.showModal()
                                }
                            >
                                Não encontraste o que perdeste?
                            </button>
                        </h2>
                        <dialog id="contacto" className="modal">
                            <div className="modal-box">
                                <h3 className="text-lg font-bold">Tu aí!</h3>
                                <p className="py-4">
                                    Se não encontraste aqui o que perdeste, não desesperes! Manda um
                                    e-mail para <b>uachadomachado@gmail.com</b> com uma breve
                                    descrição do teu item e faremos o nosso melhor para fazê-lo
                                    chegar até ti!
                                </p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn">Entendido!</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        {selectedItem && (
                            <Modal
                                selectedItem={selectedItem}
                                droppoints={dropPoints}
                                onOpenOtherComponent={openMapComponent}
                            />
                        )}

                        {showMap && isLoaded && !loadError && (
                            <LocationModal
                                // chamar a api para obter a localização do ponto de recolha
                                location={
                                    dropPoints.filter(
                                        (point) => point.id === selectedItem?.dropoffPoint_id
                                    )[0]
                                }
                                userLocation={userLocation}
                                onCloseModal={() => setShowMap(false)}
                                calculateMidpoint={calculateMidpoint}
                            />
                        )}
                    </div>
                )}
        </div>
    );
}
export default ItemList;

