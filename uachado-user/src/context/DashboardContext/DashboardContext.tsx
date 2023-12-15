import React, { useState, createContext, useEffect, useContext } from "react";

import { ItemType } from "../../types/ItemType.ts";
import { DashboardContextType } from "../../types/DashboardContextType.ts";
import axios from "axios";
import { AuthContext } from "../LoginContext/AuthContext.tsx";

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
  selectedState: "stored",
  setSelectedState: () => {}, // This should actually be a state updater function
  archiveItem: (_item: ItemType | null, _email: string) => {}, // This should actually be a state updater function
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
  const { token, id } = useContext(AuthContext);

  useEffect(() => {
    setFilteredData([]);
    fetchItems(page);
    fetchTags();
  }, [selectedState, page, selectedTag]);

  const fetchTags = async () => {
    try {
      // Adjust the endpoint as needed
      axios
        .get(itemsBaseUrl + "items/tags/", {
          headers: { Authorization: `Bearer ${token}` },
        })
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
    const drop_point_id: number | null = id;

    let my_filter = {};

    if (selectedTag !== "Todos") {
      my_filter = { tag: selectedTag, state: selectedState };
    } else {
      my_filter = { state: selectedState };
    }
    try {
      // Adjust the endpoint as needed
      if (drop_point_id === null) return;
      axios
        .put(
          itemsBaseUrl +
            "items/point/" +
            drop_point_id +
            "?page=" +
            page +
            "&size=5",
          {
            filter: my_filter,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

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
    if (!filePath) return undefined;
    try {
      const response = await axios.get(itemsBaseUrl + "image/" + filePath, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      return URL.createObjectURL(response.data); // Create an Object URL from the Blob
    } catch (error) {
      console.error("Error fetching image:", error);
      return undefined;
    }
  };

  useEffect(() => {
    const updateDataWithImages = async () => {
      if (data.length === 0) return;

      const dataWithImages = await Promise.all(
        data.map(async (item) => {
          const imageData = await fetchItemImage(item);
          return { ...item, image: imageData };
        })
      );

      setFilteredData(dataWithImages);
    };

    updateDataWithImages();
  }, [data, selectedTag]);

  const toggleSelectedState = () => {
    setFilteredData([]);
    setSelectedState((prevState) =>
      prevState === "stored" ? "retrieved" : "stored"
    );
  };

  const archiveItem = async (item: ItemType, email: string) => {
    try {
      // Adjust the endpoint as needed
      axios
        .put(
          itemsBaseUrl + "items/retrieve/" + item.id,
          {
            email: email,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(function (response) {
          // meter modal a confirmar que o item foi arquivado
          console.log(response);
        })
        .catch(function (error) {
          console.error("Error sending data:", error);
        });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
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
        selectedState,
        setSelectedState,
        archiveItem,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
