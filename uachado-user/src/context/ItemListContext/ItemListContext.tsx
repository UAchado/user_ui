import React, { useState, createContext, useEffect } from "react";

import { ItemType } from "../../types/ItemType.ts";
import { ItemListContextType } from "../../types/ItemListContextType.ts";
import axios from "axios";

// Define a default context value with dummy functions for setting state
const defaultContextValue: ItemListContextType = {
  selectedItem: null,
  setSelectedItem: () => {}, // This should actually be a state updater function
  tags: [], // Assuming tags is an empty array by default
  setTags: () => {}, // This should actually be a state updater function
  selectedTag: "Todos", // The default value for the selectedTag
  setSelectedTag: () => {}, // This should actually be a state updater function
  data: [], // Assuming data is an empty array by default
  setData: () => {}, // This should actually be a state updater function
  filteredData: [], // Assuming filteredData is an empty array by default
  setFilteredData: () => {}, // This should actually be a state updater function
  page: 1,
  setPage: () => {}, // This should actually be a state updater function
  totalPages: 1,
  setTotalPages: () => {}, // This should actually be a state updater function
};

// Create the context
export const ItemListContext =
  createContext<ItemListContextType>(defaultContextValue);
interface ItemlListContextProviderProps {
  children: React.ReactNode; // Correct typing for children
}
// Define the provider for the context
export const ItemListContextProvider: React.FC<
  ItemlListContextProviderProps
> = ({ children }) => {
  const itemsBaseUrl = import.meta.env.VITE_INVENTORY_URL;
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [selectedTag, setSelectedTag] = useState("Todos");
  const [filteredData, setFilteredData] = useState<ItemType[]>([]);
  const [data, setData] = useState<ItemType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setFilteredData([]);
    fetchItems(page);
    fetchTags();
  }, [page, selectedTag]);

  const fetchTags = async () => {
    try {
      // Adjust the endpoint as needed
      axios
        .get(itemsBaseUrl + "items/tags")
        .then(function (response) {
          setTags(response.data);
        })
        .catch(function (error) {
          console.error("Error sending data:", error);
        });
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchItems = async (page: number) => {
    let my_filter = {};

    if (selectedTag !== "Todos") {
      my_filter = {"tag": selectedTag};;
    }

    try {
      // Adjust the endpoint as needed
      axios
        .post(itemsBaseUrl + "items/stored?page=" + page + "&size=5", {
          filter: my_filter,
        })
        .then(function (response) {
          setData(response.data.items);
          setTotalPages(response.data.pages);
        })
        .catch(function (error) {
          console.error("Error sending data:", error);
        });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchItemImage = async (item: ItemType) => {
    const filePath = item.image;
    try {
      const response = await axios.get(itemsBaseUrl + "image/" + filePath, { responseType: 'blob' });
      return URL.createObjectURL(response.data); // Create an Object URL from the Blob
    } catch (error) {
      console.error("Error fetching image:", error);
      return undefined;
    }
  };

  useEffect(() => {
    const updateDataWithImages = async () => {
      if (data.length === 0) return;
  
      const dataWithImages = await Promise.all(data.map(async (item) => {
        const imageData = await fetchItemImage(item);
        return { ...item, image: imageData };
      }));
      
      setFilteredData(
        dataWithImages.filter((item) =>
          selectedTag === "Todos" ? true : item.tag === selectedTag
        )
      );
    };
  
    updateDataWithImages();
  }, [data, selectedTag]);

  return (
    <ItemListContext.Provider
      value={{
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
        page,
        setPage,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </ItemListContext.Provider>
  );
};
