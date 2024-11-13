import dbWorker from "#db/dbWorker.ts";

export default async function getAttributeByRelation(
  idProduct: number,
  idAttributeValue: number
): Promise<{ idAttribute: number; idRelation: number }> {
  const sql = `
    select
      vals.idAttribute,
      rel.id as idRelation
    from chbfs_attr_prod_relation rel
      inner join chbfs_attributes_values vals on vals.id = rel.idAttributeValue
      inner join chbfs_attributes attr on attr.id = vals.idAttribute
    where
      idProduct = ?
      and rel.idAttributeValue = ?
  `;
  const res = await dbWorker(sql, [idProduct, idAttributeValue]).then((x) => {
    return x.pop();
  });
  return res;
}
