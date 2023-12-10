import { ItemType } from "./ItemType";
import React from "react";
export interface DashboardContextType {
  selectedItem: ItemType | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<ItemType | null>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTag: string;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
  data: ItemType[];
  setData: React.Dispatch<React.SetStateAction<ItemType[]>>;
  filteredData: ItemType[];
  setFilteredData: React.Dispatch<React.SetStateAction<ItemType[]>>;
  toggleSelectedState: (item: ItemType) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}
