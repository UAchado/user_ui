import { ItemType } from "./ItemType";
import React from "react";
export interface DashboardContextType {
    selectedItem: ItemType | null,
    setSelectedItem: React.Dispatch<React.SetStateAction<ItemType | null>>,
    tags: string[],
    selectedTag: string,
    setSelectedTag: React.Dispatch<React.SetStateAction<string>>,
    data: ItemType[],
    setData: React.Dispatch<React.SetStateAction<ItemType[]>>,
    filteredData: ItemType[],
    setFilteredData: React.Dispatch<React.SetStateAction<ItemType[]>>,
}