import { ProductsFull } from "@/types/products/prodyctType";

export default function UpdateIndexNumber(props: {
  idProduct: number;
  indexNumber: number;
  prevProduct: ProductsFull;
  nextProduct: ProductsFull;
}) {
  const move = (vector: "up" | "down") => {
    if (vector === "up") {
      console.log(
        `меняем местами товар ${props.idProduct} с ${props.prevProduct.id}`
      );
    }
  };

  return (
    <>
      <div>
        {props.prevProduct && (
          <div>
            <button
              className="btn btn-sm btn-outline-dark"
              onClick={() => move("up")}
            >
              поднять
            </button>
          </div>
        )}
        {props.nextProduct && (
          <div>
            <button
              className="btn btn-sm btn-outline-dark"
              onClick={() => move("down")}
            >
              опустить
            </button>
          </div>
        )}
      </div>
    </>
  );
}
