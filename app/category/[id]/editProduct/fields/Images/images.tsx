import { useEffect, useState } from "react";
import getImages from "./utils/getImages";

export default function Images(props: { idProduct: number }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    //@ts-ignore
    getImages(props.idProduct).then((x) => {
      setImages(x);
    });
  }, []);
  return (
    <>
      <pre>{JSON.stringify({ props, images }, null, 2)}</pre>
    </>
  );
}
