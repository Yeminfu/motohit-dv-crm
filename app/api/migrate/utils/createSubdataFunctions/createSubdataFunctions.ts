import createCategory from "@/db/crud/createCategory";

export async function createSubdataFunctions() {
  const array = Array.from({ length: 3 }, (_, b) => b);
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const categoryId = await createCategory("название" + element, "описание" + element);
    console.log('categoryId', categoryId.insertId,);
    // if (Boolean(index % 4)) {
      const newCategory = await createCategory(
        "название" + element + categoryId.insertId,
        "описание" + element + categoryId.insertId,
        categoryId.insertId
      );
      console.log('newCategory', newCategory.insertId);

    // }

  }
}
