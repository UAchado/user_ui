import { useState } from "react";
import Dropdown from "./form/dropdown";
import axios from "axios";
import Image from "./form/image";
/**
 * Component for creating a new item.
 */

const tags = [
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

const NewItem = () => {
  const [warning, setWarning] = useState<string | null>(null);
  const [sucess, setSucess] = useState<string | null>(null);
  /**
   * Handles the submit event of the form element.
   * Logs the form data to the console.
   * @param e - The submit event.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Access form fields directly from formData
    const description = formData.get("description");
    const image = formData.get("image") as File;
    const tag = formData.get("tag");

    // Now, formData contains the form data, and you can decide how to process it.
    console.log("Description:", description);
    console.log("Image:", image);
    console.log("Tag:", tag);

    if (tag != null) {
      if (tags.includes(tag.toString())) {

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function () {
          const base64Image = reader.result as string;
          formData.set("image", base64Image);
          axios
            .post("https://eo9s62lz76myhtf.m.pipedream.net", formData)
            .then(function (response) {
              console.log("Data sent successfully:", response.data);
              setSucess("Tag is valid");
            })
            .catch(function (error) {
              console.error("Error sending data:", error);
            });
        };
      } else {
        setWarning("Tag is invalid");
      }
    }
  };

  return (
    <div className="toast toast-middle toast-center">
      <div className="flex justify-center">
        <div className="card bg-primary mt-20">
          <div className="card-body">
            <h2 className="card-title">Formulário de novo Objeto Perdido</h2>
            <form onSubmit={handleSubmit}>
              {/* Textarea for item description */}
              <div className="form-control w-full max-w-xs">
                <textarea
                  className="textarea bg-secondary border-primary placeholder-black text-black w-full max-w-xs mt-5"
                  placeholder="Breve descrição sobre o item e como foi encontrado."
                  name="description"
                  required
                ></textarea>

                {/* Dropdown for item category */}
                <Dropdown items={tags} />

                <Image />
                {/* Submit button */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-secondary bordered border-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {warning && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setWarning(null)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>input a tag that exists on the list.</span>
        </div>
      )}
      {sucess && (
        <div className="alert alert-sucess">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setWarning(null)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Sucessfully added item</span>
        </div>
      )}
    </div>
  );
};

export default NewItem;
