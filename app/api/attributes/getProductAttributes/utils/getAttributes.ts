import dbWorker from "@/db/dbWorker";
import ts_productAttributes from "../types/ts_productAttributes";

export default async function getAttributes(
  idProduct: number
): Promise<ts_productAttributes[]> {
  return await dbWorker(
    `
    SELECT
      relation.id as idRelation,
      attr.attribute_name,
      attr.id idAttribute,
      vals.value_name,
      vals.id idAttributeValue,
    from chbfs_attr_prod_relation relation
      left join chbfs_attributes_values vals 
      on
        vals.id = relation.idAttributeValue
          left join chbfs_attributes attr 
          on
            attr.id = vals.idAttribute
    where 
      relation.idProduct = ?
  `,
    [idProduct]
  );
}
