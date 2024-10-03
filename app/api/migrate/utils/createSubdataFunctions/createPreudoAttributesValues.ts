import dbWorker from "@/db/dbWorker";
import ts_attributeValue from "@/types/attributes/ts_attributeValue";

export default async function createPreudoAttributesValues() {

  const attributes = await getAttributes();

  for (let index = 0; index < attributes.length; index++) {
    const attribute = attributes[index];

    const arr = [1, 2, 3];

    for (let index = 0; index < arr.length; index++) {
      const number = arr[index];
      await createAttributeValue({
        value_name: "value_name_" + number,
        idAttribute: attribute.id,
        created_by: 1
      });

    }
  }
}

async function createAttributeValue(props: {
  value_name: string;
  idAttribute: number;
  created_by: number
}) {

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
  `, [props.value_name, props.idAttribute, props.created_by])
}

async function getAttributes(): Promise<ts_attributeValue[]> {
  return await dbWorker(`
    select
      *
    from ${process.env.TABLE_PREFIX}_attributes
  `, [])
}