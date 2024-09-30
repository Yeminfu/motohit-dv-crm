import createAttribute from "@/db/crud/createAttribute";
import getDataFromDB from "@/db/getDataFromDB";

export default async function createPreudoAttribcreatePreudoAttributesValuesutes() {
  const categories = await getCategories();
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    const res = await createAttribute(
      `атрибут для ${category.category_name}`, 1, 1, category.id, 1
    );
  }
}

async function getCategories() {
  return await getDataFromDB(`
    select  
      *
    from ${process.env.TABLE_PREFIX}_categories
    where
      id not in (
        select idParent from ${process.env.TABLE_PREFIX}_categories where idParent is not null
      )
  `, [])
}