import dbWorker from "@/db/dbWorker2";

export default async function exportAttrProdRelationFromShop() {
  const categoriesFromShop = await dbWorker(
    `
      insert into motohit_dv_crm.chbfs_attr_prod_relation
      (
        id,
        created_by,
        idAttributeValue,
        idProduct 
      )
      select 
        id,
        1,
        attribute_value,
        product 
      from motohit_dv.attr_prod_relation;
  `,
    []
  ).then(x => x.result).then((x) => x[0]);
}
