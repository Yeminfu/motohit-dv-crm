import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";

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
      <div className="d-flex flex-wrap">
        {imageFiles.map((file, index) => {
          const url = URL.createObjectURL(file);

          return (
            <div key={index} className="p-2">
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  position: "relative",
                }}
              >
                <Image
                  loader={() => url}
                  src={url}
                  alt=""
                  fill={true}
                  style={{ objectFit: "cover", marginRight: "10px" }}
                />
              </div>
              <div
                className="btn btn-outline-danger btn-sm w-100 mt-1"
                onClick={() => handleRemoveImage(index)}
              >
                удалить
              </div>
            </div>
          );
        })}
      </div>
      <input type="file" accept="image/*" multiple onChange={handleAddImage} />
    </div>
  );
}
