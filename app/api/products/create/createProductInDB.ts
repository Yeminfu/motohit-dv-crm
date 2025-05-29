import ts_product4create from "@/types/products/ts_product4create";
import dbWorker from "@/db/dbWorker2";
import slugify from "slugify";

export async function createProductInDB(product: ts_product4create) {
  const res = await dbWorker(`createProduct(?,?, ?, ?, ?, ?, ?, ?)`, [
    product.name.trim(),
    slugify(product.name.trim()),
    product.idCategory,
    product.purchase_price,
    product.cost_price.type,
    product.cost_price.value,
    product.code,
    product.color,
  ]).then(x => x.result)
    .then((x: any) => {
      return x;
    })
    .catch((err) => {
      console.error("err #djf7", err);

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
