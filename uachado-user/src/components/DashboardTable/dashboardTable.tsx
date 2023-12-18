import Dropdown from "../NewItem/Dropdown/dropdown.tsx";
import { ItemType } from "../../types/ItemType.ts";
import "@fortawesome/fontawesome-free/css/all.css";


interface DashboardTableProps {
  openItemDetails: (item: ItemType) => void;
  archiveItem: (item: ItemType, email: string) => void;
  tags: string[];
  handleSelectTag: (tag: string) => void;
  toggleSelectedState: () => void;
  selectedState: string;
  filteredItems: ItemType[];
  openArchiveModal: (item: ItemType) => void;
}
export const DashboardTable: React.FC<DashboardTableProps> = ({
  openItemDetails,
  tags,
  handleSelectTag,
  selectedState,
  toggleSelectedState,
  filteredItems,
  openArchiveModal,
}) => {
  const canArchive = () => {
    return selectedState !== "retrieved";
  };

  return (
    <div className="sm:w-[55vw] overflow-x-auto p-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Tag</th>
            <th></th>
            <th>
              <Dropdown items={tags} onSelect={handleSelectTag} />
            </th>
            <th>
              <div className="mt-7">
                <span className="label-text align-middle">Recolhidos</span>
                <input
                  onClick={toggleSelectedState}
                  type="checkbox"
                  className="toggle toggle-accent mr-2 ml-2 align-middle"
                />
                <span className="label-text align-middle">Arquivados</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-xl">
          {filteredItems.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-12 h-12 mask mask-squircle">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.description}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <i className="fas fa-image"></i>
                        )}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center space-x-2">
                  <span className="badge badge-ghost badge-md">{item.tag}</span>
                </div>
              </td>
              <td></td>
              <td>
                <button
                  className="btn btn-ghost border-primary-content"
                  onClick={() => openItemDetails(item)}
                >
                  Detalhes
                </button>
              </td>
              <td>
                {canArchive() && (
                  <button
                    className="btn btn-neutral"
                    onClick={() => openArchiveModal(item)}
                  >
                    Marcar como encontrado
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
