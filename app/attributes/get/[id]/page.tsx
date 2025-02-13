import AuthedLayout from "@/utils/authedLayout";
import getAttributeById from "./utils/getAttributeById";
import AttributeFieldEditor from "./components/attributeFieldEditorBoolean";
import getAttributeValues from "#app/attributes/category/[id]/utils/getAttributeValues.ts";
import ValuesEditor from "./components/valuesEditor/valuesEditor";
import Link from "next/link";
import AttributeValueCreator from "./components/attributeValueCreator/attributeValueCreator";

export default async function Page(a: { params: { id: string } }) {
  const attribute = await getAttributeById(Number(a.params.id));

  if (!attribute) {
    return <>не найден атрибут</>;
  }

  const values = await getAttributeValues(attribute.id);

  return (
    <AuthedLayout title={`Атрибут: ${attribute.attribute_name}`}>
      <div className="card">
        <div className="card-header">данные об атрибуте</div>
        <div className="card-body">
          <table className="table table-bordered w-auto ">
            <tbody>
              <tr>
                <th>id</th>
                <td>{a.params.id}</td>
              </tr>
              <tr>
                <th>категория</th>
                <td>
                  <Link href={`/attributes/category/` + attribute.idCategory}>
                    {attribute.category_name}
                  </Link>
                </td>
              </tr>
              <tr>
                <th>виден в фильтре</th>
                <td>
                  <AttributeFieldEditor
                    idAttribute={attribute.id}
                    fieldName="view_in_filter"
                    attributeInitValue={attribute.view_in_filter}
                  />
                </td>
              </tr>
              <tr>
                <th>раскрыт в фильтре</th>
                <td>
                  <AttributeFieldEditor
                    idAttribute={attribute.id}
                    fieldName="isOpenInFilter"
                    attributeInitValue={attribute.isOpenInFilter}
                  />
                </td>
              </tr>
              <tr>
                <th>главный</th>
                <td>
                  <AttributeFieldEditor
                    idAttribute={attribute.id}
                    fieldName="is_main"
                    attributeInitValue={attribute.is_main}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-4" />
      <div className="card">
        <div className="card-header">
          <>Значения атрибута</>
        </div>
        <div className="card-body">
          <ValuesEditor attributeValues={values} />
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <strong>Создать значение атрибута</strong>
        </div>
        <div className="card-body">
          <AttributeValueCreator idAttribute={attribute.id} />
        </div>
      </div>
    </AuthedLayout>
  );
}
