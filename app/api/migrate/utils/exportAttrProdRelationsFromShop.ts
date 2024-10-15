import dbWorker from "@/db/dbWorker";

export default async function exportAttrProdRelationsFromShop() {
  const categoriesFromShop = await dbWorker(`
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
      from motohit_dv.attr_prod_relation
  `, []).then(x => x[0]);

  console.log('categoriesFromShop', categoriesFromShop);
}
