import dbWorker from "@/db/dbWorker";
import ts_productAttributes from "@/types/products/ts_productAttributes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(a: NextRequest, b: any) {
  const { idProduct } = await a.json();

  const attributes = await getAttributes(idProduct);

  return NextResponse.json({
    attributes,
  });
}

async function getAttributes(
  idProduct: number
): Promise<ts_productAttributes[]> {
  return await dbWorker(
    `
    SELECT
      attr.attribute_name,
      attr.id idAttribute,
      vals.value_name,
      vals.id idValue
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
