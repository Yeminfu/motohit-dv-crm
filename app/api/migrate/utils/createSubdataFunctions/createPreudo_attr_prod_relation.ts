// import createAttribute from "@/db/crud/createAttribute";
import dbWorker from "@/db/dbWorker";
import ts_attributeValue from "@/types/attributes/ts_attributeValue";

export default async function createPreudo_attr_prod_relation() {

  const categories = await getCategories();

  for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
    const category = categories[categoryIndex];
    const attributesByCategory = await getAttributes(category.id);
    for (let attributeIndex = 0; attributeIndex < attributesByCategory.length; attributeIndex++) {
      const attribute = attributesByCategory[attributeIndex];
      const products = await getProductsByategory(category.id);//getAttributeValues
      for (let productindex = 0; productindex < products.length; productindex++) {
        const product = products[productindex];
        const getAttributeValues = await getAttributesValues(attribute.id);
        for (let attrprodvalindex = 0; attrprodvalindex < getAttributeValues.length; attrprodvalindex++) {
          const attr_val = getAttributeValues[attrprodvalindex];
          console.log('products', attribute.id, attr_val.id, product.id);
          await createattr_prod_relation(attr_val.id, product.id)
          // console.log('attr_val', attr_val.id);
        }
        // console.log('attributesByCategoryattributesByCategoryattributesByCategoryattributesByCategory', { attribute, category, getAttributeValues, products });
        console.log('product', attribute.id, attribute.id, product.id);
        break;
      }
      break;
    }
    // break;
  }
}

async function createattr_prod_relation(idAttributeValue: number, idProduct: number) {
  await dbWorker(`
    insert into ${process.env.TABLE_PREFIX}_attr_prod_relation
    (
      idAttributeValue,
      idProduct,
      created_by
    )
    values (
      ?, ?,?
    )
  `, [idAttributeValue, idProduct, 1])
}

async function getCategories() {
  return await dbWorker(`
    select  
      *
    from ${process.env.TABLE_PREFIX}_categories
    where
      id not in (
        select idParent from ${process.env.TABLE_PREFIX}_categories where idParent is not null
      )
  `, [])
}


async function getAttributes(idCategory: number): Promise<ts_attributeValue[]> {
  return await dbWorker(`
    select
      *
    from ${process.env.TABLE_PREFIX}_attributes
  `, [])
}

async function getAttributesValues(idCategory: number): Promise<ts_attributeValue[]> {
  return await dbWorker(`
    select
      *
    from ${process.env.TABLE_PREFIX}_attributes_values
  `, [])
}

async function getProductsByategory(idCategory: number): Promise<{ id: number }[]> {
  return await dbWorker(`
    select
      *
    from ${process.env.TABLE_PREFIX}_products
    where
      idCategory = ?
  `, [idCategory])
}