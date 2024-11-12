import dbWorker from "#db/dbWorker.ts";

export default async function getIdAttributeByProductAndValue(
  idProduct: number,
  idAttributeValue: number
): Promise<number> {
  const sql = `
    select (
      select
        vals.idAttribute
      from chbfs_attr_prod_relation rel
        inner join chbfs_attributes_values vals on vals.id = rel.idAttributeValue
        inner join chbfs_attributes attr on attr.id = vals.idAttribute
      where
        idProduct = ?
        and rel.idAttributeValue = ?
      limit 1
    )
    as idAttribute;
  `;
  const res = await dbWorker(sql, [idProduct, idAttributeValue]).then((x) => {
    return Number(x.pop().idAttribute);
  });
  return res;
}
