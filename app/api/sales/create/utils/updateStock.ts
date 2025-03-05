export default async function updateStock(
  connection: any, idProduct: number, idShop: number, count: number
) {
  const sql = `
    update chbfs_stock s
    set
      s.count = s.count - ?
      ,s.updateSource = 'sale'
    where
      s.idProduct = ?
      and s.idShop = ?
  `;
  await connection.query(sql, [count, idProduct, idShop]);
}
