import { useContext } from 'react';
import { ItemListContext } from '../context/ItemListContext/ItemListContext';

export function useItemListContextContext() {
    const context = useContext(ItemListContext);
    if (!context) {
        // You can throw an error or handle this scenario as you see fit
        throw new Error('useItemListContext must be used within a ItemListProvider');
    }
    return context;
}