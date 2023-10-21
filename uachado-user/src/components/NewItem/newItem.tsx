import { useState } from "react";
import Dropdown from "./dropdown";

/**
 * Component for creating a new item.
 */

const NewItem = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  /**
   * Handles the change event of the file input element.
   * Sets the selected image to the uploaded file.
   * @param e - The change event.
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          if (event.target) {
            setSelectedImage(event.target.result as string);
          }
        };

        reader.readAsDataURL(file);
      } else {
        setSelectedImage(null);
      }
    } else {
      setSelectedImage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Access form fields directly from formData
    const description = formData.get("description");
    const image = formData.get("image") as File;
    const objectType = formData.get("toggle-group");

    // Now, formData contains the form data, and you can decide how to process it.
    console.log("Description:", description);
    console.log("Image:", image);
    console.log("Object Type:", objectType);

    // You can perform further processing with formData as needed.
  };

  return (
    <div className="sm:flex flex-column justify-center px-20 py-16 bg-primary gap-40">
      <form onSubmit={handleSubmit}>
        <label className="label">
          <span className="label-text ">Formulário de novo Objeto Perdido</span>
        </label>
        <div className="form-control w-full max-w-xs">
          <textarea
            className="textarea bg-primary border-secondary placeholder-black text-black w-full max-w-xs"
            placeholder="Breve descrição de como o item foi encontrado"
            name="description"
          ></textarea>

          <br />
          <div className="collapse collapse-arrow bg-primary border border-secondary">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Foto do Objeto
            </div>
            <div className="collapse-content">
              <input
                name="image"
                type="file"
                accept="image/png, image/jpeg, image/svg, image/jpg"
                className="file-input file-input-ghost w-full max-w-xs"
                onChange={handleImageChange}
              />
              {selectedImage && (
                <img src={selectedImage} alt="Selected Preview" width="50%" />
              )}
            </div>
          </div>
        </div>
        <br />
        <Dropdown />

        <br />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewItem;
