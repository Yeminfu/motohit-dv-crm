import { ProductsFull } from "@/types/products/prodyctType";
import fetchData from "./utils/fetchData";

export default function UpdateIndexNumber(props: {
  idProduct: number;
  indexNumber: number;
  prevProduct: ProductsFull;
  nextProduct: ProductsFull;
}) {
  const up = () => fetchData(props.idProduct, props.prevProduct.id);
  const down = () => fetchData(props.idProduct, props.nextProduct.id);

  return (
    <>
      <div>
        {props.prevProduct && (
          <div>
            <button className="btn btn-sm btn-outline-dark" onClick={up}>
              поднять
            </button>
          </div>
        )}
        {props.nextProduct && (
          <div>
            <button className="btn btn-sm btn-outline-dark" onClick={down}>
              опустить
            </button>
          </div>
        )}
      </div>
    </>
  );
}
