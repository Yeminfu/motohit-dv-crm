import dbWorker from "#db/dbWorker2.ts";
import { AttributeType } from "#types/categories/attributes.ts";

export default async function getAttributeById(
  idAttribute: number
): Promise<AttributeType | undefined> {
  const sql = `
    select
      Attr.id,
      Attr.attribute_name,
      Attr.view_in_filter,
      Attr.isOpenInFilter,
      Attr.idCategory,
      Attr.is_main,
      Cat.category_name
    from motohit_dv_crm.chbfs_attributes Attr
      inner join motohit_dv_crm.chbfs_categories Cat on Cat.id = Attr.idCAtegory
    where
      Attr.id = ?
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
