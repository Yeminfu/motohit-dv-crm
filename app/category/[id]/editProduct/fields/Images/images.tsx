import OldImages from "./components/oldImages";
import NewImages from "./components/newImages";

export default function Images(props: { idProduct: number }) {
  return (
    <>
      <OldImages idProduct={props.idProduct} />
      <NewImages />
    </>
  );
}
