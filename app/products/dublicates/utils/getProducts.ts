import dbWorker from "@/db/dbWorker2";
import ts_dublicate from "../types/ts_bublicate";

export default async function getProducts(page: number): Promise<undefined | ts_dublicate[]> {
  const perPage = 100;
  const offset = perPage * page;
  const sql = `
    select distinct
      ${perPage} as perPage,
      ${page} as page,
      ${offset} as offset,
      p1.id as idProduct1
      ,p1.name as productName1
      ,p1.description as description1
      ,p1.idCategory as idCategory1
      ,p1.purchase_price as purchase_price1
      ,p1.idCostPriceType as idCostPriceType1
      ,p1.costPriceValue as costPriceValue1
      ,p1.internetPrice as internetPrice1
      ,p1.isArchived as isArchived1

      ,p2.id as idProduct2
      ,p2.name as productName2
      ,p2.description as description2
      ,p2.idCategory as idCategory2
      ,p2.purchase_price as purchase_price2
      ,p2.idCostPriceType as idCostPriceType2
      ,p2.costPriceValue as costPriceValue2
      ,p2.internetPrice as internetPrice2
      ,p2.isArchived as isArchived2
    from chbfs_products as p1
      inner join chbfs_products as p2
        on
          p2.clearname = p1.clearname
          and p2.id <> p1.id
    limit ${perPage}
    offset ${offset}
  `;
  const res = await dbWorker(sql, []);
  return res.result;
}