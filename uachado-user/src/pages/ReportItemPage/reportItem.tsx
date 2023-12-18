import { useEffect, useState } from "react";
import Dropdown from "../../components/NewItem/Dropdown/dropdown";
import axios from "axios";
import Image from "../../components/NewItem/Image/image";

/**
 * Component for creating a new item.
 */
const ReportItem = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [warning, setWarning] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const itemsBaseUrl = import.meta.env.VITE_INVENTORY_URL;
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false); // New state variable

  useEffect(() => {
    // Fetch tags from the API
    const fetchTags = async () => {
      try {
        const response = await axios.get(itemsBaseUrl + "items/tags");
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    selectedImage: File | null
  ) => {
    e.preventDefault();

    setShowLoading(true);

    const tag = e.currentTarget.tag.value;
    const description = e.currentTarget.description.value;
    const report_email = e.currentTarget.email.value; // Or however you get this value

    e.currentTarget.tag.value = "";
    e.currentTarget.description.value = "";
    e.currentTarget.email.value = "";

    if (tag && tags.includes(tag.toString())) {
      const formData = new FormData();
      formData.append("tag", tag);
      formData.append("description", description);
      if (selectedImage) {
        formData.append("image", selectedImage);
      } else {
        formData.append("image", new Blob(), "");
      }
      formData.append("report_email", report_email);

      try {
        await axios.post(itemsBaseUrl + "items/report", formData);
        // Reset form fields
        setSelectedImageFile(null);
        setSuccess("Item adicionado com sucesso");
        setShowLoading(false);
        setFormSubmitted(true); // Mark the form as submitted
      } catch (error) {
        console.error("Error sending data:", error);
        setWarning("Erro ao enviar dados");
        setShowLoading(false);
        setFormSubmitted(false); // Mark the form as not submitted
      }
    } else {
      setWarning("A tag é inválida");
      setShowLoading(false);
      setFormSubmitted(false); // Mark the form as not submitted
    }
  };
  return (
    <div className="items-center">
      {warning && (
        <div className="alert alert-error">
          {/* Error message */}
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
          <span style={{ fontSize: "11px" }}>{warning}</span>
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          {/* Success message */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 stroke-current shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setSuccess(null)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span style={{ fontSize: "11px" }}>{success}</span>
        </div>
      )}
      {tags.length !== 0 && !showLoading && (
        <div className="flex justify-center">
          <div className="card bg-primary">
            <div className="card-body">
              <h2 className="card-title">Formulário de Objeto Perdido</h2>
              <form onSubmit={(e) => handleSubmit(e, selectedImageFile)}>
                {/* Textarea for item description */}
                <div className="w-full max-w-xs form-control">
                  <input
                    name="email"
                    placeholder="O teu email (da UA se aplicável)"
                    className="w-full max-w-xs mt-5 text-black placeholder-black textarea bg-secondary"
                  />
                  <textarea
                    className="w-full max-w-xs mt-5 text-black placeholder-black textarea bg-secondary"
                    placeholder="Breve descrição sobre o item para facilitar a identificação."
                    name="description"
                    required
                  ></textarea>

                  {/* Dropdown for item category */}
                  <Dropdown items={tags} />

                  <Image onImageChange={setSelectedImageFile} />
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
      {showLoading && !formSubmitted && (
        <div className="flex justify-center">
          {/* Show a spinner while loading */}
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportItem;
