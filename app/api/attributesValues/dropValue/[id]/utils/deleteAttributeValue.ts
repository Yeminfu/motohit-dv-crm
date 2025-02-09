import dbConnection from "#db/connect.ts";

export default async function deleteAttributeValue(idAttributeValue: number) {
  const connection = await dbConnection();
  try {
    await connection.beginTransaction();
    await connection.query(`delete from motohit_dv_crm.chbfs_attr_prod_relation where idAttributeValue = ?`, [idAttributeValue]);
    const result = await connection.query(`delete from motohit_dv_crm.chbfs_attributes_values where id = ?`, [idAttributeValue]);
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