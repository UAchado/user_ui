function Image({
  onImageChange,
}: {
  onImageChange: (file: File | null) => void;
}) {
  /**
   * Handles the change event of the file input element.
   * Sets the selected image to the uploaded file.
   * @param e - The change event.
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onImageChange(file); // Pass the file object to the parent component
    }
  };
  return (
    <>
      <div className="collapse collapse-arrow bg-secondary mt-7">
        <input type="checkbox" />
        <div className="text-xl font-medium collapse-title">Foto do Objeto</div>
        <div className="collapse-content">
          {/* File input for item image */}
          <input
            name="image"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="w-full max-w-xs file-input file-input-primary"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <label className="label">
        <span
          className="label-text"
          style={{ fontSize: "9px", overflowWrap: "break-word" }}
        >
          Não insira fotos com informações sensiveis.
        </span>
      </label>
    </>
  );
}

export default Image;
