import dbWorker from "#db/dbWorker.ts";

export default async function getIdAttributeByProductAndValue(
  idProduct: number,
  idAttributeValue: number
): Promise<boolean> {
  const res = await dbWorker(
    `
      set @idAttribute = (
        select
          vals.idAttribute
        from chbfs_attr_prod_relation rel
          inner join chbfs_attributes_values vals
          on vals.id = rel.idAttributeValue
          inner join chbfs_attributes attr on attr.id = vals.idAttribute
        where
          idProduct = ?
          and rel.idAttributeValue = ?
      );
    `,
    [idProduct, idAttributeValue]
  ).then((x) => {
    console.log("xxx", x);
    return Boolean(x.pop().count);
  });
  return res;
}
