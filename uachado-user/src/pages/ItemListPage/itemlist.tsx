import { useState, useEffect } from "react";
import Dropdown from "../../components/NewItem/Dropdown/dropdown";
import Modal from "../../components/ItemDetails/ItemDetails";
import LocationModal from "../../components/Map/locationModal";
import axios from "axios";

const ItemList = () => {
  const itemsBaseUrl = import.meta.env.VITE_INVENTORY_URL;
  const [tags, setTags] = useState<string[]>([]);
  const data = [
    {
      image:
        "https://media.discordapp.net/attachments/852109272262770710/1166749106669113364/image.png",
      description: "Carteira preta",
      tag: "Carteiras",
      dropoffPoint_id: "Cantina de Santiago",
    },
    {
      image:
        "https://www.lenovo.com/medias/lenovo-laptop-yoga-slim-series-feature-2-1.png?context=bWFzdGVyfC9lbWVhL2ltYWdlcy98NjkxMzczfGltYWdlL3BuZ3wvZW1lYS9pbWFnZXMvaDgyL2gzZC8xNTg4MTY4MTk5Mzc1OC5wbmd8OWUxZWI4ZTBjZjRhYTNiN2E2YmZlODEyOTAzYjdmOTc4NTE0ZTdiM2IwMGQ0YzI3MzI0NjVkM2I0NTBmY2U5MA",
      description: "Notebook ultrafino",
      tag: "Portáteis",
      dropoffPoint_id: "Reitoria",
    },
    {
      image:
        "https://www.tek4life.pt/media/catalog/product/cache/2/image/800x800/85e4522595efc69f496374d01ef2bf13/s/2/s23__lavender_composta_1.png",
      description: "Smartphone Samsung",
      tag: "Telemóveis",
      dropoffPoint_id: "Cantina de Santiago",
    },
    {
      image:
        "https://img.pccomponentes.com/articles/1066/10663343/1111-lenovo-tab-m10-hd-2nd-gen-101-3-32gb-gris.jpg",
      description: "Tablet Lenovo",
      tag: "Tablets",
      dropoffPoint_id: "Cantina do Crasto",
    },
    {
      image:
        "https://nanochip.pt/wp-content/uploads/Produtos/JBLT520BTAZUL/headphone-jbl-tune-t520-5-3-le-bluetooth-azul-0.jpg",
      description: "Auscultadores JBL",
      tag: "Auscultadores/Fones",
      dropoffPoint_id: "Cantina do Crasto",
    },
    {
      image:
        "https://www.worten.pt/i/370d3f3ddc5f01b5fb58963e70730d74e5d61626.jpg",
      description: "Carregador portátil universal",
      tag: "Carregadores",
      dropoffPoint_id: "CP",
    },
  ];

  const [selectedItem, setSelectedItem] = useState<{
    image: string;
    description: string;
    tag: string;
    dropoffPoint_id: string;
  } | null>(null);

  useEffect(() => {
    if (selectedItem !== null) {
      const modal: any = document.getElementById("my_modal_1");
      modal.showModal();
    }
  }, [selectedItem]);

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
    fetchTags();
  }, []);

  const [selectedTag, setSelectedTag] = useState<string>("Todos");
  const [showMap, setShowMap] = useState(false);

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

  return (
    <div>
      {tags.length !== 0 && (
        <div className="sm:w-[55vw] overflow-x-auto p-10">
          <table className="table">
            {/* head */}
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
                  <td>{item.dropoffPoint_id}</td>
                  <td className="flex justify-center   items-center">
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
      )}
      {selectedItem && (
        <Modal
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onOpenOtherComponent={openMapComponent}
        />
      )}
      {showMap && (
        <LocationModal
          // chamar a api para obter a localização do ponto de recolha
          location={{
            name: "",
            latitude: 0,
            longitude: 0,
          }}
          //
          userLocation={null}
          onCloseModal={() => setShowMap(false)}
          calculateMidpoint={function (
            lat1: number,
            lng1: number,
            lat2: number,
            lng2: number
          ): { lat: number; lng: number } | null {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </div>
  );
};

export default ItemList;
