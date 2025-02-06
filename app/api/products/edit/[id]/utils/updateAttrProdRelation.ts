import { ResultSetHeader } from "mysql2";

export default async function updateAttrProdRelation(
  connection: any,
  idProduct: number,
  idAttributeValue: number,
) {
  const sql = `
    set @idProduct = ?;
    set @idAttributeValue = ?;
    INSERT INTO chbfs_attr_prod_relation (idProduct, idAttributeValue, created_by)
    VALUES (@idProduct, @idAttributeValue, 1)
    ON DUPLICATE KEY UPDATE
      idProduct = @idProduct, 
      idAttributeValue = @idAttributeValue;
  `;

  const res: ResultSetHeader = await connection.query(sql, [
    idProduct,
    idAttributeValue
  ]);
  return res;
}
