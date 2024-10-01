import getDataFromDB from "../dbWorker";

export default async function createAttribute(
    attribute_name: string,
    created_by: number,
    view_in_filter: boolean | 0 | 1,
    idCategory: number,
    is_main: boolean | 0 | 1
) {
    const result = await getDataFromDB(`
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
    )
  `, [
        attribute_name,
        created_by,
        view_in_filter,
        idCategory,
        is_main
    ]);
    return result;
}