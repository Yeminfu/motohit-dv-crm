import dbWorker from "@/db/dbWorker";
import ts_fullProduct from "@/types/products/ts_fullProduct";

type ts_localType = Pick<ts_fullProduct,
    "id" | "name" | "description"
>

export default async function getProduct(idProduct: number): Promise<ts_localType> {
    return await dbWorker(`
    select
      id,
      name,
      slug,
      description,
      idCategory,
      purchase_price,
      idCostPriceType,
      costPriceValue,
      color,
      code,
      note,
      isArchived
    from chbfs_products
    where id = ?
  `, [idProduct]).then(x => x[0])
}