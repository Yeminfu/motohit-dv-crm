import dbWorker from "@/db/dbWorker";
import { AttributeType } from "@/types/categories/attributes";
import { CategoryFromDBInterface } from "@/types/categories/categories";
import AuthedLayout from "@/utils/authedLayout";

export default async function Page(a: { params: { id: string } }) {
  const category = await getCategory(Number(a.params.id));
  // console.log('category', category);
  if (!category) return;

  // const attributes = await getAttributes(Number(a.params.id))

  return <AuthedLayout title={"Атрибуты категории: " + category.category_name}>
    page {a.params.id}
    <pre>{JSON.stringify(category, null, 2)}</pre>
    {/* <pre>{JSON.stringify(attributes, null, 2)}</pre> */}
  </AuthedLayout>
}

async function getAttributes(idCategory: number): Promise<AttributeType> {
  return await dbWorker(`
    select
      *
    from ${process.env.TABLE_PREFIX}_attributes
    where
      idCategory = ?
  `, [idCategory])
}

async function getCategory(idCategory: number): Promise<CategoryFromDBInterface | undefined> {
  return dbWorker(`
  select
    *
  from ${process.env.TABLE_PREFIX}_categories
  where
    id = ?
`, [idCategory]).then(x => x.pop())
}