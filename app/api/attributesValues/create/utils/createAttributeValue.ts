import dbWorker from "@/db/dbWorker2";
import ts_inputs from "@/app/attributes/get/[id]/components/attributeValueCreator/types/ts_inputs";

export default async function createAttributeValue(props: ts_inputs, created_by: number) {
  const sql = `
    insert into chbfs_attributes_values
    (
      idAttribute,
      value_name,
      created_by
    )
    values
    (
      ?,?,?
    );
  `;

  const res = await dbWorker(sql, [props.idAttribute, props.value_name, created_by]);
  return res;
}