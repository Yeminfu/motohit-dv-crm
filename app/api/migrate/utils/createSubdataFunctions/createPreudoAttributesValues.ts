import dbWorker from "@/db/dbWorker";
import ts_attributeValue from "@/types/attributes/ts_attributeValue";
import getUserByToken from "@/utils/users/getUserByToken";
import { cookies } from "next/headers";

export default async function createPreudoAttributesValues() {
  const authToken = String(cookies().get("auth")?.value);
  const user = await getUserByToken(authToken);

  const attributes = await getAttributes();
  console.log('#vnfd84', attributes);

  await createAttributeValue()

  //   const categories = await getCategories();
  for (let index = 0; index < attributes.length; index++) {
    const attribute = attributes[index];
    console.log('attribute', attribute);

    //     // const res = await createAttribute(
    //     //   `атрибут для ${category.category_name}`, 1, 1, category.id, 1
    //     // );
  }
}

async function createAttributeValue() {

  await dbWorker(`
    insert into ${process.env.TABLE_PREFIX}_attributes_values
    (
      value_name,
      idAttribute,
      created_by
    )
    values (
      ?, ?, ?
    )
  `, ["значение 1", 1, 1])
}

async function getAttributes(): Promise<ts_attributeValue[]> {
  return await dbWorker(`
    select
      *
    from ${process.env.TABLE_PREFIX}_attributes
  `, [])
}