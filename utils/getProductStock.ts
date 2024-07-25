import dbConnection from "@/db/connect";

export default async function getProductStock(idProduct: any) {
  const connection = await dbConnection();
  const qs = `select 
  Stock.*, 
  Shop.shopName
from ${process.env.TABLE_PREFIX}_stock Stock
    left join ${process.env.TABLE_PREFIX}_shops Shop on Shop.id = Stock.idShop
where Stock.idProduct = ?
`;

  const stock = await connection
    .query(
      qs,
      [idProduct]
    )
    .then(([x]: any) => {
      return x;
    });
  await connection.end();
  return stock;
}
