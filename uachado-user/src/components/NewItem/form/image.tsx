import { useState } from "react";

function Image() {
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

  {
    /* Collapse section for item image */
  }
  return (
    <>
      <div className="collapse collapse-arrow bg-secondary border border-primary mt-7">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Foto do Objeto</div>
        <div className="collapse-content">
          {/* File input for item image */}
          <input
            name="image"
            type="file"
            accept="image/png, image/jpeg, image/svg, image/jpg"
            className="file-input file-input-primary w-full max-w-xs"
            onChange={handleImageChange}
          />

          {/* Preview of selected image */}
          {selectedImage && (
            <img src={selectedImage} alt="Selected Preview" width="50%" />
          )}
        </div>
      </div>
      <label className="label">
        <span className="label-text" style={{ fontSize: "9px" , overflowWrap: "break-word"}}>
          Não insira fotos com informações sensiveis.
        </span>
      </label>
    </>
  );
}

export default Image;
