export default async function getSales(connection: any) {
  // const connection = await dbConnection();
  const qs = `
    select
      P.id,
      P.name,
      (select ifnull(cast(sum(count) as signed), 0) from chbfs_stock where idProduct = P.id and idShop = 1) as 'бир',
      (select ifnull(cast(sum(count) as signed), 0) from chbfs_stock where idProduct = P.id and idShop = 2) as 'хаб',
      (select ifnull(cast(sum(count) as signed), 0) from chbfs_stock where idProduct = P.id and idShop = 3) as 'блг',
      P.purchase_price as 'закуп цена',
      ifnull(
        getPriceMarkup(
          P.purchase_price /*@initSum,*/
          ,P.idCostPriceType /*@idMarkupType,*/
          ,P.costPriceValue /*@markupSum*/
        )
        ,0
      ) as 'себестоимость'
    from chbfs_products P
    where isArchived <> 1
  `;
  const res = await connection.query(qs)
    .then(([x]: any) => x)
  return res;
}