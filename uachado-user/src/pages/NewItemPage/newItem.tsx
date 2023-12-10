import { useEffect, useState } from "react";
import Dropdown from "../../components/NewItem/Dropdown/dropdown";
import axios from "axios";
import Image from "../../components/NewItem/Image/image";
/**
 * Component for creating a new item.
 */

const NewItem = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [warning, setWarning] = useState<string | null>(null);
  const [sucess, setSucess] = useState<string | null>(null);
  const itemsBaseUrl = import.meta.env.VITE_INVENTORY_URL;

  useEffect(() => {
    // Fetch tags from the API
    const fetchTags = async () => {
      try {
        // Adjust the endpoint as needed
        axios
          .get(itemsBaseUrl + "items/tags/")
          .then(function (response) {
            setTags(response.data);
            console.log("Data fetched successfully:", response.data);
          })
          .catch(function (error) {
            console.error("Error sending data:", error);
          });
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tag = e.currentTarget.tag.value;
    // Access form fields directly from formData

    if (tag != null) {
      if (tags.includes(tag.toString())) {
        // Send data to the API
        const data = {"tag": tag, "description": e.currentTarget.description.value, "image": e.currentTarget.image.value, "dropoff_point_id": 1}
        console.log(data)
        axios
          .post(itemsBaseUrl + "items/create", data) // change to post request to the server
          .then(function (response) {
            console.log("Data sent successfully:", response.data);
            setSucess("Item adicionado com sucesso");
          })
          .catch(function (error) {
            console.error("Error sending data:", error);
          });
      } else {
        setWarning("A tag é inválida");
      }
    }
  };

  return (
    <div className="items-center toast toast-middle toast-center">
      {warning && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 stroke-current shrink-0"
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
          <span style={{ fontSize: "11px" }}>
            Selecione uma tag da lista.
          </span>
        </div>
      )}
      {sucess && (
        <div className="w-1/2 alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 stroke-current shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setSucess(null)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span style={{ fontSize: "11px" }}>Item adicionado com sucesso.</span>
        </div>
      )}
      {tags.length !== 0 && (
        <div className="flex justify-center">
          <div className="card bg-primary">
            <div className="card-body">
              <h2 className="card-title">Formulário de Objeto Encontrado</h2>
              <form onSubmit={handleSubmit}>
                {/* Textarea for item description */}
                <div className="w-full max-w-xs form-control">
                  <textarea
                    className="w-full max-w-xs mt-5 text-black placeholder-black textarea bg-secondary"
                    placeholder="Breve descrição sobre o item e como foi encontrado."
                    name="description"
                    required
                  ></textarea>

                  {/* Dropdown for item category */}
                  <Dropdown items={tags} />

                  <Image />
                  {/* Submit button */}
                  <div className="justify-end card-actions">
                    <button
                      type="submit"
                      className="btn btn-secondary bordered border-primary"
                    >
                      Submeter
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewItem;
