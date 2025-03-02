// import dbWorker from "../edbWorker2";

import dbWorker from "@/db/dbWorker2";

export default async function createAttribute(
  props: {
    attribute_name: string,
    created_by: number,
    view_in_filter: boolean | 0 | 1,
    idCategory: number,
    is_main: boolean | 0 | 1
  }
) {
  const sql = `
    insert into ${process.env.TABLE_PREFIX}_attributes
    (
      attribute_name,
      created_by,
      view_in_filter,
      idCategory,
      is_main
    )
    values
    (
      ?,
      ?,
      ?,
      ?,
      ?
    );
    select last_insert_id();
  `;

  const result = await dbWorker(sql, [
    props.attribute_name,
    props.created_by,
    props.view_in_filter,
    props.idCategory,
    props.is_main
  ]).then(x => x.result);

  return result;
}