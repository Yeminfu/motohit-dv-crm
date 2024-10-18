import dbWorker from "@/db/dbWorker";
import ts_attributeValue from "@/types/attributes/ts_attributeValue";

export default async function getAttributevalues(idAttribute: number): Promise<ts_attributeValue[]> {
  return await dbWorker(`
      select
        *
      from ${process.env.TABLE_PREFIX}_attributes_values
      where
        idAttribute = ?
    `, [idAttribute])
}