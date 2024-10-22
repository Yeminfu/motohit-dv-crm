import AuthedLayout from "@/utils/authedLayout";
import getAttributes from "./getAttributes";
import getCategory from "./getCategory";
import dbWorker from "@/db/dbWorker";

export default async function Page(a: { params: { id: string } }) {
  const category = await getCategory(Number(a.params.id));

  if (!category) return;

  const attributes = await getAttributes(Number(a.params.id));

  const attributesWithValues = await Promise.all(
    attributes.map(async (attribute) => ({
      ...attribute,
      values: await getAttributeValues(attribute.id),
    }))
  );

  return (
    <AuthedLayout title={"Атрибуты категории: " + category.category_name}>
      <table className="table table-bordered table-striped">
        <thead>
          <tr className="sticky-top">
            <th>id</th>
            <th>Название атрибута</th>
            <th>Виден в фильтре</th>
            <th>Открыт в фильтре</th>
            <th>Главный</th>
            <th>Значения</th>
          </tr>
        </thead>
        <tbody>
          {attributesWithValues.map((attribute) => (
            <tr key={attribute.id}>
              <td> {attribute.id} </td>
              <td>
                {attribute.attribute_name} <EditField />
              </td>
              <td>
                {attribute.view_in_filter} <EditField />
              </td>
              <td>
                {attribute.isOpenInFilter} <EditField />
              </td>
              <td>
                {attribute.is_main} <EditField />
              </td>
              <td>
                <table className="table">
                  <tbody>
                    {attribute.values.map((attributeValue) => (
                      <tr key={attributeValue.id}>
                        <td>{attributeValue.value_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AuthedLayout>
  );
}

async function getAttributeValues(
  idAttribute: number
): Promise<ts_attributeValue[]> {
  return dbWorker(
    `
      select
        *
      from ${process.env.TABLE_PREFIX}_attributes_values
      where
        idAttribute = ?
    `,
    [idAttribute]
  );
}

interface ts_attributeValue {
  id: number;
  value_name: string;
  created_date: Date;
  created_by: number;
  idAttribute: number;
}

function EditField() {
  return (
    <>
      <Pencil />
    </>
  );
}

function Pencil() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-pencil-square"
        viewBox="0 0 16 16"
      >
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
        <path
          fill-rule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
        ></path>
      </svg>
    </>
  );
}
