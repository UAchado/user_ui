import React from "react";

interface ModalProps {
  selectedItem: {
    image: string;
    description: string;
    tag: string;
    dropoffPoint_id: string;
  } | null;
  setSelectedItem: (
    item: {
      image: string;
      description: string;
      tag: string;
      dropoffPoint_id: string;
    } | null
  ) => void;
}

const Modal: React.FC<ModalProps> = ({ selectedItem, setSelectedItem }) => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        {/* Apply max-width to limit the image size */}
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
          Guardado em: <b>{selectedItem?.dropoffPoint_id}</b>
        </h1>
        <div className="modal-action grid justify-center">
          <form method="dialog">
            <button className="btn btn-primary mr-3" onClick={() => setSelectedItem(null)}>
              Confirmar
            </button>
            <button className="btn ml-3" onClick={() => setSelectedItem(null)}>
              Fechar
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
