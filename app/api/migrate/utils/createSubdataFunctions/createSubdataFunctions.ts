import createCategory from "@/db/crud/createCategory";

export async function createSubdataFunctions() {
  const array = Array.from({ length: 10 }, (_, b) => b);
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    await createCategory("название" + element, "описание" + element)
  }
}
