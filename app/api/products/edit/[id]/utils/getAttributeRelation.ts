import dbWorker from "#db/dbWorker.ts";

export default async function getAttributeRelation(
  idProduct: number,
  idAttribute: number
): Promise<ts_returnRelation | undefined> {
  const sql = `
    select
      *
    from chbfs_attr_prod_relation
    where
      idProduct = ?
      and idAttributeValue in (
        select id from chbfs_attributes_values where idAttribute = ?
      )
  `;
  const res = await dbWorker(sql, [idProduct, idAttribute]).then((x) => {
    return x.pop();
  });
  return res;
}

interface ts_returnRelation {
  idAttribute: number;
  id: number;
}
