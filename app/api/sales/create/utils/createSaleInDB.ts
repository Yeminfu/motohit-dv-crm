export default async function createSaleInDB(
  connection: any, idProduct: number, idShop: number, count: number, saleSum: number, idUser: number
) {
  const sql = `
    set @idProduct = ?;
    set @idShop = ?;
    set @count = ?;
    set @saleSum = ?;
    set @idUser = ?;

    call createSale (
      @idProduct,
      @idShop,
      @count,
      @saleSum,
      @idUser
    ) 
  `;
  return await connection.query(sql, [idProduct, idShop, count, saleSum, idUser]);

}