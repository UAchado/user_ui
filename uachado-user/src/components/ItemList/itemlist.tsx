import React, { useState } from 'react';
import Dropdown from '../NewItem/form/dropdown';

interface Item {
  image: string;
  description: string;
  tag: string;
  dropoffPoint_id: string;
}

interface Props {
  data: Item[];
}

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

const ItemList: React.FC<Props> = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("Todos");

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const filteredData = selectedTag === "Todos" ? data : data.filter((item) => item.tag === selectedTag);

  return (
    <div>
      <div className="sm:w-[55vw] overflow-x-auto p-10">
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Ponto de Recolha</th>
              <th>
                <Dropdown items={tags} onSelect={handleSelectTag} /> 
              </th>
            </tr>
          </thead>
          <tbody className='text-xl'>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="w-12 h-12 mask mask-squircle">
                        <img src={item.image} alt={item.description} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center space-x-2">
                    <span className="badge badge-ghost badge-md">{item.tag}</span>
                  </div>
                </td>
                <td>{item.dropoffPoint_id}</td>
                <td>
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
      {selectedItem && (
        <div className="modal">
          <div className="modal-box">
            <img src={selectedItem.image} alt={selectedItem.description} />
            <h3 className="text-lg font-bold">{selectedItem.description}</h3>
            <span className="badge badge-ghost badge-md">{selectedItem.tag}</span>
            <h1 className="text-xl font-bold">
              Guardado em: <b>{selectedItem.dropoffPoint_id}</b>
            </h1>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
