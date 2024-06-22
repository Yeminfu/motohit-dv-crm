import dbConnection from "@/db/connect";

export default async function getProductStock(idProduct: any) {
  const connection = await dbConnection();
  const stock = await connection
    .query(
      `select 
      Stock.*, Shop.shopName
      from ${process.env.TABLE_PREFIX}_stock Stock
          left join ${process.env.TABLE_PREFIX}_shops Shop on Shop.id = Stock.idShop
      where Stock.idProduct = ?
      `,
      [idProduct]
    )
    .then(([x]: any) => {
      return x;
    });
  await connection.end();
  return stock;
}
