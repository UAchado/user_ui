import React, {useState, createContext, useEffect} from 'react';

import {ItemType} from "../../types/ItemType.ts";
import {ItemListContextType} from "../../types/ItemListContextType.ts";
import axios from 'axios';


// Define a default context value with dummy functions for setting state
const defaultContextValue: ItemListContextType = {
    selectedItem: null,
    setSelectedItem: () => {}, // This should actually be a state updater function
    tags: [], // Assuming tags is an empty array by default
    setTags: () => {}, // This should actually be a state updater function
    selectedTag: 'Todos', // The default value for the selectedTag
    setSelectedTag: () => {}, // This should actually be a state updater function
    data: [], // Assuming data is an empty array by default
    setData: () => {}, // This should actually be a state updater function
    filteredData: [], // Assuming filteredData is an empty array by default
    setFilteredData: () => {}, // This should actually be a state updater function
  };

  // Create the context
export const ItemListContext = createContext<ItemListContextType>(defaultContextValue);
interface ItemlListContextProviderProps {
    children: React.ReactNode; // Correct typing for children
}
// Define the provider for the context
export const ItemListContextProvider: React.FC<ItemlListContextProviderProps> = ({children}) => {
    const itemsBaseUrl = import.meta.env.VITE_INVENTORY_URL;
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
    const [selectedTag, setSelectedTag] = useState("Todos");
    const [filteredData, setFilteredData] = useState<ItemType[]>([]);
    const [data, setData] = useState([

            {
                "image": "https://media.discordapp.net/attachments/852109272262770710/1166749106669113364/image.png",
                "description": "Carteira preta",
                "tag": "Carteiras",
                "dropoffPoint_id": 4,
                "admittedAt": "2021-04-01T00:00:00.000Z",
                "isVisible": true,
                "state": "archived"
            },
            {
                "image": "https://www.lenovo.com/medias/lenovo-laptop-yoga-slim-series-feature-2-1.png?context=bWFzdGVyfC9lbWVhL2ltYWdlcy98NjkxMzczfGltYWdlL3BuZ3wvZW1lYS9pbWFnZXMvaDgyL2gzZC8xNTg4MTY4MTk5Mzc1OC5wbmd8OWUxZWI4ZTBjZjRhYTNiN2E2YmZlODEyOTAzYjdmOTc4NTE0ZTdiM2IwMGQ0YzI3MzI0NjVkM2I0NTBmY2U5MA",
                "description": "Notebook ultrafino",
                "tag": "Portáteis",
                "dropoffPoint_id": 1,
                "admittedAt": "2021-05-01T00:00:00.000Z",
                "isVisible": true,
                "state": "stored"
            },
            {
                "image": "https://www.tek4life.pt/media/catalog/product/cache/2/image/800x800/85e4522595efc69f496374d01ef2bf13/s/2/s23__lavender_composta_1.png",
                "description": "Smartphone Samsung",
                "tag": "Telemóveis",
                "dropoffPoint_id": 4,
                "admittedAt": "2021-06-01T00:00:00.000Z",
                "isVisible": true,
                "state": "archived",
            },
            {
                "image": "https://img.pccomponentes.com/articles/1066/10663343/1111-lenovo-tab-m10-hd-2nd-gen-101-3-32gb-gris.jpg",
                "description": "Tablet Lenovo",
                "tag": "Tablets",
                "dropoffPoint_id": 5,
                "admittedAt": "2021-07-01T00:00:00.000Z",
                "isVisible": true,
                "state": "stored",
            },
            {
                "image": "https://nanochip.pt/wp-content/uploads/Produtos/JBLT520BTAZUL/headphone-jbl-tune-t520-5-3-le-bluetooth-azul-0.jpg",
                "description": "Auscultadores JBL",
                "tag": "Auscultadores/Fones",
                "dropoffPoint_id": 5,
                "admittedAt": "2021-08-01T00:00:00.000Z",
                "isVisible": true,
                "state": "archived",
            },
            {
                "image": "https://www.worten.pt/i/370d3f3ddc5f01b5fb58963e70730d74e5d61626.jpg",
                "description": "Carregador portátil universal",
                "tag": "Carregadores",
                "dropoffPoint_id": 2,
                "admittedAt": "2021-08-01T00:00:00.000Z",
                "isVisible": true,
                "state": "stored",
            }

        ]);
    const [tags, setTags] = useState<string[]>([]);

    useEffect
    (() => {
        fetchTags();
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



    return (
        <ItemListContext.Provider value={{
            selectedItem,
            setSelectedItem,
            tags,
            setTags,
            selectedTag,
            setSelectedTag,
            data,
            setData,
            filteredData,
            setFilteredData,
        }}>
            {children}
        </ItemListContext.Provider>
    );
}
