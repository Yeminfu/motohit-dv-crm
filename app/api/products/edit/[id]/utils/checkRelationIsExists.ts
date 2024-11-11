import dbWorker from "#db/dbWorker.js";

export default async function checkRelationIsExists(
  idProduct: number,
  idAttributeValue: number
): Promise<boolean> {
  console.log("checkRelationIsExists", { idProduct, idAttributeValue });
  const res = await dbWorker(
    `
    select count(1) count from chbfs_attr_prod_relation
    where
      idProduct = ?
      and idAttributeValue = ?
  `,
    [idProduct, idAttributeValue]
  ).then((x) => Boolean(x.pop().count));
  return res;
}
