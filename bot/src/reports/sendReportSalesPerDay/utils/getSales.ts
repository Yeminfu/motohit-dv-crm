export default async function getSales(connection: any) {
  // const connection = await dbConnection();
  const qs = `
    select
      P.id AS id,
      P.name AS товар,
      C.category_name AS категория,
      getSalesSumPerProductAndShopToday(P.id,1) AS 'сумма бир',
      getSalesCountPerProductAndShopToday(P.id,1) AS 'к-во бир',
      getSalesSumPerProductAndShopToday(P.id,2) AS 'сумма хаб',
      getSalesCountPerProductAndShopToday(P.id,2) AS 'к-во хаб',
      getSalesSumPerProductAndShopToday(P.id,3) AS 'сумма блг',
      getSalesSumPerProductAndShopToday(P.id,3) AS 'к-во блг' 
    from (chbfs_products P 
    join chbfs_categories C on((C.id = P.idCategory))) 
    where 
      (
        (
          getSalesSumPerProductAndShopToday(P.id,1)
          + getSalesSumPerProductAndShopToday(P.id,2)
          + getSalesSumPerProductAndShopToday(P.id,3)
        ) > 0) 
    order by C.id
  `;
  const res = await connection.query(qs)
    .then(([x]: any) => x)
  return res;
}