import dbWorker from "#db/dbWorker2.ts";
import { AttributeType } from "#types/categories/attributes.ts";

export default async function getAttributeById(
  idAttribute: number
): Promise<AttributeType | undefined> {
  const sql = `
    select
      id,
      attribute_name,
      view_in_filter,
      isOpenInFilter,
      idCategory,
      is_main
    from
      motohit_dv_crm.chbfs_attributes
    where
      id = ?
  `;

  const res = await dbWorker(
    sql,
    [idAttribute]
  );

  if (!res.result) {
    console.error('error #sdfsdf94k', res);
    return;
  }
  if (!res.result.length) return;
  return res.result.pop();
}
