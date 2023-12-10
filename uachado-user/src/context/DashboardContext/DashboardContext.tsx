import React, { useState, createContext, useEffect } from "react";

import { ItemType } from "../../types/ItemType.ts";
import { DashboardContextType } from "../../types/DashboardContextType.ts";
import axios from "axios";

// Define a default context value with dummy functions for setting state
const defaultContextValue: DashboardContextType = {
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
  toggleSelectedState: () => {}, // Replace with the actual implementation
  page: 1,
  setPage: () => {}, // This should actually be a state updater function
  totalPages: 1,
  setTotalPages: () => {}, // This should actually be a state updater function
};

// Create the context
export const DashboardContext =
  createContext<DashboardContextType>(defaultContextValue);
interface DashboardContextProviderProps {
  children: React.ReactNode; // Correct typing for children
}
// Define the provider for the context
export const DashboardContextProvider: React.FC<
  DashboardContextProviderProps
> = ({ children }) => {
  const itemsBaseUrl = import.meta.env.VITE_INVENTORY_URL;
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [selectedTag, setSelectedTag] = useState("Todos");
  const [filteredData, setFilteredData] = useState<ItemType[]>([]);
  const [data, setData] = useState<ItemType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("stored"); // Initial state is set to 'stored'

  useEffect(() => {
    fetchItems(page);
    fetchTags();
  }, []);

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

  const fetchItems = async (page: number) => {
    try {
      // Adjust the endpoint as needed
      axios
        .post(itemsBaseUrl + "items/stored?page=" + page + "&size=10", {
          filter: {},
        })
        .then(function (response) {
          setData(response.data.items);
          setTotalPages(response.data.pages);
          console.log("Data fetched successfully:", response.data);
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


  const toggleSelectedState = () => {
    setSelectedState((prevState) =>
      prevState === "stored" ? "archived" : "stored"
    );
  };


  return (
    <DashboardContext.Provider
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
        toggleSelectedState,
        page,
        setPage,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
