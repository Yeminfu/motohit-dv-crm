export default async function removeRedundantRelations(
  connection: any,
  idProduct: number,
  requiredRelations: number[]
) {
  const sql = `
    delete from chbfs_attr_prod_relation
    where
      idProduct = ?
      and id not in (
        ${requiredRelations.map((_) => "?")}
      )
  `;
  const result = await connection.query(sql, [idProduct, ...requiredRelations]);
  return result;
}
