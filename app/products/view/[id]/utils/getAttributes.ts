import dbWorker from "@/db/dbWorker";

export default async function getAttributes(idProduct: number): Promise<{
    attribute_name: string
    value_name: string
}[]> {
    return await dbWorker(`
      SELECT
        attr.attribute_name,
        vals.value_name
      from chbfs_attr_prod_relation relation
        left join chbfs_attributes_values vals 
        on
          vals.id = relation.idAttributeValue
            left join chbfs_attributes attr 
            on
              attr.id = vals.idAttribute
      where 
        relation.idProduct = ?
    `, [idProduct]);
}