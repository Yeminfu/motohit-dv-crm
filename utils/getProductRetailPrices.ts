import dbConnection from "@/db/connect";
import ts_retailPricesByProductIdGroupedByCity from "@/types/products/ts_retailPricesByProductIdGroupedByCity";

export default async function getProductRetailPrices(
  idProduct: any
): Promise<ts_retailPricesByProductIdGroupedByCity[]> {
  const connection = await dbConnection();

  const qs = `
    select
      prd.id as idProduct,
      s.id as idShop,
      prd.purchase_price,
      prd.idCostPriceType,
      prd.costPriceValue,
      prc.priceValue as retailPriceValue,
      prc.idPriceType as retailPriceType,
      prc.id as idRetailPrice
    from ${process.env.TABLE_PREFIX}_products prd
      join ${process.env.TABLE_PREFIX}_shops s
        left join ${process.env.TABLE_PREFIX}_retail_prices prc
        on
            prc.idShop = s.id
            and prc.idProduct = prd.id
    where prd.id = ?
`;

  const prices = await connection.query(qs, [idProduct]).then(([x]: any) => {
    return x;
  });

  await connection.end();

  return prices;
}
