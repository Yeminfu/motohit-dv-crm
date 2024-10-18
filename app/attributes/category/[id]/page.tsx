import AuthedLayout from "@/utils/authedLayout";
import getAttributes from "./getAttributes";
import getCategory from "./getCategory";
import dbWorker from "@/db/dbWorker";

export default async function Page(a: { params: { id: string } }) {
  const category = await getCategory(Number(a.params.id));

  if (!category) return;

  const attributes = await getAttributes(Number(a.params.id));

  const attributesWithValues = await Promise.all(
    attributes.map(async attribute => ({
      ...attribute,
      values: await getAttributeValues(attribute.id)
    }))
  )

  return <AuthedLayout title={"Атрибуты категории: " + category.category_name}>
    <table className="table table-bordered table-striped">
      <thead>
        <tr className="sticky-top">
          <th>id</th><th>Название атрибута</th><th>Виден в фильтре</th><th>Открыт в фильтре</th><th>Главный</th><th>Значения</th><th></th></tr>
      </thead>
      <tbody>
        {attributesWithValues.map(attribute => <tr key={attribute.id}>
          <td>{attribute.id}</td>
          <td>{attribute.attribute_name}</td>
          <td>{attribute.view_in_filter}</td>
          <td>{attribute.isOpenInFilter}</td>
          <td>{attribute.is_main}</td>
          <td>
            <table className="table">
              <tbody>
                {attribute.values.map(attributeValue => <tr>
                  <td>{attributeValue.value_name}</td>
                </tr>)}
              </tbody>
            </table>
            <ul>
            </ul>
          </td>
        </tr>)}
      </tbody>
    </table>
  </AuthedLayout>
}

async function getAttributeValues(idAttribute: number): Promise<ts_attributeValue[]> {
  return dbWorker(`
    select
      *
    from ${process.env.TABLE_PREFIX}_attributes_values
    where
      idAttribute = ?
`, [idAttribute])
}

interface ts_attributeValue {
  id: number
  value_name: string
  created_date: Date
  created_by: number
  idAttribute: number
}