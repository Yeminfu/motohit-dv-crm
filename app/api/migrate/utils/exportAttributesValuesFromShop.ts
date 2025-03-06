import dbWorker from "@/db/dbWorker2";

export default async function exportAttributesValuesFromShop() {
  const categoriesFromShop = await dbWorker(
    `
      insert into motohit_dv_crm.chbfs_attributes_values
      (
        id ,
        created_by,
        idAttribute,
        value_name 
      )
      
      select 
        id ,
        1,
        attribute,
        value_name 
      from motohit_dv.attributes_values
  `,
    []
  ).then(x => x.result).then((x) => x[0]);
}
