import dbWorker from "@/db/dbWorker";
import { ProductOnCreate } from "@/types/products/prodyctType";

export async function createProductInDB(product: ProductOnCreate) {
  // console.log({ product });
  const res = await dbWorker(
    `insert into ${process.env.TABLE_PREFIX}_products 
      (
          name, 
          idCategory, 
          purchase_price, 
          idCostPriceType, 
          costPriceValue,
          code,
          color
      )
      values (?, ?, ?, ?, ?, ?, ?)`,
    [
      product.name.trim(),
      product.idCategory,
      product.purchase_price,
      product.cost_price.type,
      product.cost_price.value,
      product.code,
      product.color,
    ]
  )
    .then((x: any) => {
      return x;
    })
    .catch((err) => {
      console.log("err #djf7", err);

      const errors: any = {
        ER_DUP_ENTRY: "Товар с таким названием уже создан",
      };

      const errorText = errors[err.code]
        ? errors[err.code]
        : "Что-то пошло не так #djd83";

      return {
        success: false,
        error: errorText,
      };
    });

  return res;
}
