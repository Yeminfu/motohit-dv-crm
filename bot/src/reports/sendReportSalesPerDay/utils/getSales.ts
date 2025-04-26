export default async function getSales(connection: any) {
  // const connection = await dbConnection();
  const qs = `
    select
      P.name as товар
      /*,P.idCategory idКатегории*/
      /*,S.idShop*/
      ,Sh.shopName as магазин
      ,sum(S.count) AS 'к-во'
      ,sum(S.sum) AS сумма
    from chbfs_sales S
      inner join chbfs_shops Sh on Sh.id = S.idShop
        inner join chbfs_products P on P.id = S.idProduct
          inner join chbfs_categories C on C.id = P.idCategory
    /*where S.created_date >= CURDATE()*/
      
    group by
      P.name 
      /*,P.idCategory*/
      ,S.idShop
      ,Sh.shopName
    order by магазин, товар
    limit 100;
  `;
  const res = await connection.query(qs)
    .then(([x]: any) => x)
  return res;
}