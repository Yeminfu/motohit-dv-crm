import dbWorker from "#db/dbWorker.ts";

export default async function getAttributeRelation(
  idProduct: number,
  idAttributeValue: number
): Promise<{ idAttribute: number; idRelation: number }> {
  const sql = `
    select
      *
    from chbfs_attr_prod_relation
    where
      idProduct = ?
      and idAttributeValue = ?
  `;
  const res = await dbWorker(sql, [idProduct, idAttributeValue]).then((x) => {
    return x.pop();
  });
  return res;
}
