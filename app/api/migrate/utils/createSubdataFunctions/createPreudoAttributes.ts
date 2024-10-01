import createAttribute from "@/db/crud/createAttribute";
import dbWorker from "@/db/dbWorker";

export default
    async function createPreudoAttributes() {

    const categories = await getCategories();
    for (let index = 0; index < categories.length; index++) {
        const category = categories[index];
        const res = await createAttribute(
            `атрибут для ${category.category_name}`, 1, 1, category.id, 1
        );
    }
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
