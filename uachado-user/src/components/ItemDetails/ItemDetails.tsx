import React from "react";

// Define a type for the item
type ItemType = {
  image: string;
  description: string;
  tag: string;
  dropoffPoint_id: number;
} | null;

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
}

const Modal: React.FC<ModalProps> = ({
  selectedItem,
  droppoints = null,
  onOpenOtherComponent,
}) => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="grid grid-cols-2 items-center text-center gap-3">
          <div className="avatar">
            <img
              src={selectedItem?.image}
              alt={"Image of " + selectedItem?.tag}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "40px",
              }} // Adjust the percentage and radius as needed
            />
          </div>
          <h3 className="text-md">{selectedItem?.description}</h3>
        </div>
        <h1 className="text-xl font-bold mt-3">
          Guardado em:
          <b>
            {droppoints!
              .filter((point) => point!.id === selectedItem?.dropoffPoint_id)
              .map((filteredPoint) => filteredPoint!.name)}
          </b>
        </h1>
        <div className="modal-action grid justify-center">
          <form method="dialog">
            <button
              className="btn btn-accent"
              onClick={() => {
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
