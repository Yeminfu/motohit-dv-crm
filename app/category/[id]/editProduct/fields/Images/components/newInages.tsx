import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function NewImages() {
  const name = "newImages";

  const { setValue } = useFormContext();
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);
      setValue(name, [...imageFiles, ...newFiles]); // обновляем значение в форме
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);
    setValue(name, updatedFiles);
  };

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleAddImage} />
      <div>
        {imageFiles.map((file, index) => (
          <div key={index}>
            <button type="button" onClick={() => handleRemoveImage(index)}>
              Удалить
            </button>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ width: "100px", height: "auto", margin: "10px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
