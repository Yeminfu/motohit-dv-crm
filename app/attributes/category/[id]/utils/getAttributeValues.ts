import dbWorker from "#db/dbWorker2.ts";
import ts_attributeValue from "#types/attributes/ts_attributeValue.ts";

export default async function getAttributeValues(
  idAttribute: number
): Promise<ts_attributeValue[]> {
  const sql = `
    select
      *
    from ${process.env.TABLE_PREFIX}_attributes_values
    where
      idAttribute = ?
  `;
  const res = await dbWorker(
    sql
    ,
    [idAttribute]
  );

  if (!res.result) {
    console.error('error #asdkasd94', res);
    return [];
  }

  return res.result;
}