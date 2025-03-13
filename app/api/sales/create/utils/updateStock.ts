export default async function updateStock(
  connection: any, idProduct: number, idShop: number, count: number, idUser: number
) {
  const sql = `
    set @idProduct = ?;
    set @idShop = ?;
    set @count = ?;
    set @idUser = ?;

    call updateStockItem (
      @idProduct,
      @idShop,
      @count,
      @idUser,
      'sale'
    ) 
  `;
  return await connection.query(sql, [idProduct, idShop, count, idUser]);
}
