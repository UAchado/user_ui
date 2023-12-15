import React from "react";
import { ItemType } from "../../types/ItemType.ts";

// Define a type for the item

type DropPointType = {
  id: number;
  name: string;
  coordinates: string;
} | null;
// Define the props for the Modal component
interface ModalProps {
  selectedItem: ItemType | null;
  droppoints: DropPointType[] | null;
  onOpenOtherComponent: () => void; // Define the type for this prop
  onCloseModal: () => void;
}

const Modal: React.FC<ModalProps> = ({
  selectedItem,
  droppoints = null,
  onOpenOtherComponent,
  onCloseModal,
}) => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onCloseModal}>
            ✕
          </button>
        </form>
        <div className="flex-col items-center text-center gap-3">
          <div className="avatar">
            <figure className="h-40 overflow-hidden">
              <img
                src={selectedItem?.image}
                alt={"Image of " + selectedItem?.tag}
                className="object-cover w-full h-full"
              />
            </figure>
          </div>
          <div>
            <span className="badge badge-neutral badge-md">
              {selectedItem?.tag}
            </span>
          </div>
          <h3 className="text-md">{selectedItem?.description}</h3>
        </div>
        <h1 className="text-xl font-bold mt-3">
          Guardado em:
          <b>
            {droppoints!
              .filter((point) => point!.id === selectedItem?.dropoff_point_id)
              .map((filteredPoint) => filteredPoint!.name)}
          </b>
        </h1>
        <div className="modal-action grid justify-center">
          <form method="dialog">
            <button
              className="btn btn-accent"
              onClick={(event) => {
                event.preventDefault(); // Prevents the default action of the form submission
                event.stopPropagation(); // Stops the click event from propagating to parent elements
                onOpenOtherComponent();
              }}
            >
              Ver no mapa
            </button>
          </form>
        </div>{" "}
      </div>
    </dialog>
  );
};

export default Modal;
