import AuthedLayout from "@/utils/authedLayout";
import getAttributes from "./getAttributes";
import getCategory from "./getCategory";

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
          <td>
            че по значениям?
          </td>
        </tr>)}
      </tbody>
    </table>
  </AuthedLayout>
}
