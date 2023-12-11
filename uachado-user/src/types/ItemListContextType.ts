import { ItemType } from "./ItemType.ts";
import React from "react";
export interface ItemListContextType {
    selectedItem: ItemType | null,
    setSelectedItem: React.Dispatch<React.SetStateAction<ItemType | null>>,
    tags: string[],
    setTags: React.Dispatch<React.SetStateAction<string[]>>,
    selectedTag: string,
    setSelectedTag: React.Dispatch<React.SetStateAction<string>>,
    data: ItemType[],
    setData: React.Dispatch<React.SetStateAction<ItemType[]>>,
    filteredData: ItemType[],
    setFilteredData: React.Dispatch<React.SetStateAction<ItemType[]>>,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number,
    setTotalPages: React.Dispatch<React.SetStateAction<number>>,
}