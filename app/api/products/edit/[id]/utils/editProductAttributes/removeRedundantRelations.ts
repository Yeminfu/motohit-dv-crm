import dbWorker from "#db/dbWorker.js";

export default async function removeRedundantRelations(
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
  const result = await dbWorker(sql, [idProduct, ...requiredRelations]);
  return result;
}
