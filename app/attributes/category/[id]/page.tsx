import AuthedLayout from "@/utils/authedLayout";
import getAttributes from "../../utils/getAttributes";
import getCategory from "./getCategory";
import Link from "next/link";
import ViewAttributeValues from "./components/viewAttributeValues";
import getAttributeValues from "./utils/getAttributeValues";
import CreatorAttribute4Category from "./components/creatorAttribute4Category/creatorAttribute4Category";

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
      <div className="card">
        <div className="card-header">Создать атрибут</div>
        <div className="card-body">
          <CreatorAttribute4Category idCategory={category.id} />{" "}
        </div>
      </div>
      <div className="my-4" />

      <div className="card">
        <div className="card-header">Список атрибутов категории</div>
        <div className="card-body">
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
                  <td>
                    <Link href={`/attributes/get/${attribute.id}`}>
                      {attribute.id}
                    </Link>
                  </td>
                  <td>{attribute.attribute_name}</td>
                  <td>{attribute.view_in_filter}</td>
                  <td>{attribute.isOpenInFilter}</td>
                  <td>{attribute.is_main}</td>
                  <td>
                    <ViewAttributeValues attributeValues={attribute.values} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthedLayout>
  );
}
