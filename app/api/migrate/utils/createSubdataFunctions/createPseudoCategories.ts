import createCategory from "@/db/crud/createCategory";
import getDataFromDB from "@/db/getDataFromDB";

export default async function createPseudoCategories() {
    const array = Array.from({ length: 3 }, (_, b) => b);
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      const categoryId = await createCategory("название" + element, "описание" + element);
  
      await createCategory(
        "название" + element + categoryId.insertId,
        "описание" + element + categoryId.insertId,
        categoryId.insertId
      );
  
    }
    const children = await getChildCategories();
    for (let index = 0; index < children.length; index++) {
      const category = children[index];
      await createCategory(
        "название" + index + category.insertId,
        "описание" + index + category.insertId,
        category.id
      );
      await createCategory(
        "название" + index + 1 + category.insertId,
        "описание" + index + 1 + category.insertId,
        category.id
      );
      await createCategory(
        "название" + index + 2 + category.insertId,
        "описание" + index + 2 + category.insertId,
        category.id
      );
    }
  
  }
  
  async function getChildCategories() {
    return await getDataFromDB(`select * from ${process.env.TABLE_PREFIX}_categories where idParent is not null`, [])
  }