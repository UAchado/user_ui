import React, {useState, createContext} from 'react';

import {ItemType} from "../../types/ItemType.ts";
import {DashboardContextType} from "../../types/DashboardContextType.ts";

// Create the context
export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);
interface DashboardContextProviderProps {
    children: React.ReactNode; // Correct typing for children
}
// Define the provider for the context
export const DashboardContextProvider: React.FC<DashboardContextProviderProps> = ({children}) => {
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
    const [selectedTag, setSelectedTag] = useState("Todos");
    const [data, setData] = useState([

            {
                "image": "https://media.discordapp.net/attachments/852109272262770710/1166749106669113364/image.png",
                "description": "Carteira preta",
                "tag": "Carteiras",
                "dropoffPoint_id": "Cantina de Santiago",
                "admittedAt": "2021-04-01T00:00:00.000Z",
                "isVisible": true,
                "state": "archived"
            },
            {
                "image": "https://www.lenovo.com/medias/lenovo-laptop-yoga-slim-series-feature-2-1.png?context=bWFzdGVyfC9lbWVhL2ltYWdlcy98NjkxMzczfGltYWdlL3BuZ3wvZW1lYS9pbWFnZXMvaDgyL2gzZC8xNTg4MTY4MTk5Mzc1OC5wbmd8OWUxZWI4ZTBjZjRhYTNiN2E2YmZlODEyOTAzYjdmOTc4NTE0ZTdiM2IwMGQ0YzI3MzI0NjVkM2I0NTBmY2U5MA",
                "description": "Notebook ultrafino",
                "tag": "Portáteis",
                "dropoffPoint_id": "Reitoria",
                "admittedAt": "2021-05-01T00:00:00.000Z",
                "isVisible": true,
                "state": "stored"
            },
            {
                "image": "https://www.tek4life.pt/media/catalog/product/cache/2/image/800x800/85e4522595efc69f496374d01ef2bf13/s/2/s23__lavender_composta_1.png",
                "description": "Smartphone Samsung",
                "tag": "Telemóveis",
                "dropoffPoint_id": "Cantina de Santiago",
                "admittedAt": "2021-06-01T00:00:00.000Z",
                "isVisible": true,
                "state": "archived",
            },
            {
                "image": "https://img.pccomponentes.com/articles/1066/10663343/1111-lenovo-tab-m10-hd-2nd-gen-101-3-32gb-gris.jpg",
                "description": "Tablet Lenovo",
                "tag": "Tablets",
                "dropoffPoint_id": "Cantina do Crasto",
                "admittedAt": "2021-07-01T00:00:00.000Z",
                "isVisible": true,
                "state": "stored",
            },
            {
                "image": "https://nanochip.pt/wp-content/uploads/Produtos/JBLT520BTAZUL/headphone-jbl-tune-t520-5-3-le-bluetooth-azul-0.jpg",
                "description": "Auscultadores JBL",
                "tag": "Auscultadores/Fones",
                "dropoffPoint_id": "Cantina do Crasto",
                "admittedAt": "2021-08-01T00:00:00.000Z",
                "isVisible": true,
                "state": "archived",
            },
            {
                "image": "https://www.worten.pt/i/370d3f3ddc5f01b5fb58963e70730d74e5d61626.jpg",
                "description": "Carregador portátil universal",
                "tag": "Carregadores",
                "dropoffPoint_id": "CP",
                "admittedAt": "2021-08-01T00:00:00.000Z",
                "isVisible": true,
                "state": "stored",
            }

        ]);
    const tags = [
        "Todos",
        "Portáteis",
        "Telemóveis",
        "Tablets",
        "Auscultadores/Fones",
        "Carregadores",
        "Pen drives",
        "Câmaras",
        "Livros",
        "Cadernos",
        "Material de escritório",
        "Carteiras",
        "Chaves",
        "Cartão",
        "Óculos",
        "Joalharia",
        "Casacos",
        "Chapéus/Bonés",
        "Cachecóis",
        "Luvas",
        "Mochilas",
        "Equipamento desportivo",
        "Garrafas de água",
        "Guarda-chuvas",
        "Instrumentos musicais",
        "Material de arte",
        "Bagagem",
        "Produtos de maquilhagem",
        "Artigos de higiene",
        "Medicamentos",
    ];
    const [filteredData, setFilteredData] = useState<ItemType[]>([]);
    const [selectedState, setSelectedState] = useState<string>("stored"); // Initial state is set to 'stored'

    const toggleSelectedState = () => {
        setSelectedState(prevState => prevState === "stored" ? "archived" : "stored");
    }
    const filteredItems = filteredData.filter(item => item.state === selectedState);

    return (
        <DashboardContext.Provider value={{
            selectedItem,
            setSelectedItem,
            tags,
            selectedTag,
            setSelectedTag,
            data,
            setData,
            filteredData,
            setFilteredData,
            toggleSelectedState,
            filteredItems
        }}>
            {children}
        </DashboardContext.Provider>
    );
}
