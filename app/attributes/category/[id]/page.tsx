import dbWorker from "@/db/dbWorker";
import { AttributeType } from "@/types/categories/attributes";
import { CategoryFromDBInterface } from "@/types/categories/categories";
import AuthedLayout from "@/utils/authedLayout";

export default async function Page(a: { params: { id: string } }) {
  const category = await getCategory(Number(a.params.id));
  // console.log('category', category);
  if (!category) return;

  const attributes = await getAttributes(Number(a.params.id))

  return <AuthedLayout title={"Атрибуты категории: " + category.category_name}>
    <table className="table table-bordered ">
      <thead>
        <tr className="sticky-top">
          <th>id</th><th>Название атрибута</th><th>Виден в фильтре</th><th>Открыт в фильтре</th><th>Главный</th><th>Значения</th><th></th></tr>
      </thead>
      <tbody>
        {attributes.map(attribute => <tr key={attribute.id}>
          <td>{attribute.id}</td>
          <td>{attribute.attribute_name}</td>
          <td>{attribute.view_in_filter}</td>
          <td>{attribute.is_open_in_filter}</td>
          <td>{attribute.is_main}</td>
        </tr>)}
      </tbody>
    </table>
  </AuthedLayout>
}

async function getAttributes(idCategory: number): Promise<AttributeType[]> {
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