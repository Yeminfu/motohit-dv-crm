import { useEffect } from "react";
import Image from "next/image";
import { useFieldArray, useFormContext } from "react-hook-form";
import getImages from "../utils/getImages";

export default function OldImages(props: { idProduct: number }) {
  const { control } = useFormContext();

  const {
    fields: oldImages,
    append: appendOldImage,
    remove: removeOldImage,
  } = useFieldArray({
    control,
    name: "oldImages",
  });

  useEffect(() => {
    getImages(props.idProduct).then((imagesFromAPI) => {
      for (let index = 0; index < imagesFromAPI.length; index++) {
        const imgObj = imagesFromAPI[index];
        console.log("imgObj", imgObj);
        appendOldImage(imgObj);
      }
    });
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap">
        {oldImages.map((item, index) => {
          //@ts-ignore
          const url = `https://мотохит-дв.рф/images/` + item.name;
          return (
            <div key={item.id} className="p-2">
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
                onClick={() => {
                  removeOldImage(index);
                  console.log("asdasd");
                }}
              >
                удалить
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
