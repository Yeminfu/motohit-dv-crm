import dbConnection from "#db/connect.ts";

export default async function deleteAttributeValue(idAttributeValue: number) {
  const sql = `
    set @idAttributeValue = ?;
    delete from motohit_dv_crm.chbfs_attr_prod_relation where idAttributeValue = @idAttributeValue;
    delete from motohit_dv_crm.chbfs_attributes_values where id = @idAttributeValue;
  `;

  const connection = await dbConnection();
  try {
    await connection.beginTransaction();
    const result = await connection.query(sql, [idAttributeValue]);
    await connection.commit();
    await connection.end();
    return result;

  } catch (error) {
    console.error('error #kfsdf94', error);
    await connection.rollback();
    await connection.end();
    return { error }
  }

}