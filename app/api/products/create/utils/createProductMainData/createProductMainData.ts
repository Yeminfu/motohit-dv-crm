import dbWorker from "#db/dbWorker.ts";
import { ResultSetHeader } from "mysql2";
import slugify from "slugify";

export default async function createProductMainData(
  productData: any
): Promise<ResultSetHeader> {
  const res = await dbWorker(
    `
      insert into ${process.env.TABLE_PREFIX}_products
      (
        name,
        slug,
        note,
        idCostPriceType,
        idCategory,
        costPriceValue,
        purchase_price,
        color,
        code
      )
      values
      (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
    `,
    [
      productData.name,
      slugify(productData.name.trim()),
      productData.note,
      productData.idCostPriceType,
      productData.idCategory,
      productData.costPriceValue,
      productData.purchase_price,
      productData.color,
      productData.code,
    ]
  );
  return res;
}
