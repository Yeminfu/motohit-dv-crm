import AuthedLayout from "@/utils/authedLayout";
import getAttributeById from "./utils/getAttributeById";
import AttributeFieldEditor from "./components/attributeFieldEditorBoolean";

export default async function Page(a: { params: { id: string } }) {
  const attribute = await getAttributeById(Number(a.params.id));

  if (!attribute) {
    return <>не найден атрибут</>;
  }

  return (
    <AuthedLayout title={`Атрибут: ${attribute.attribute_name}`}>
      <table className="table table-bordered w-auto ">
        <tbody>
          <tr>
            <th>id</th>
            <td>{a.params.id}</td>
          </tr>
          <tr>
            <th>категория</th>
            <td>{attribute.attribute_name}</td>
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
      Атрибут № {a.params.id}
      <pre>{JSON.stringify(attribute, null, 2)}</pre>
    </AuthedLayout>
  );
}
