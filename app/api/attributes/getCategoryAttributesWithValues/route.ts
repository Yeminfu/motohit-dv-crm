import dbWorker from "@/db/dbWorker";
import ts_attributeValue from "@/types/attributes/ts_attributeValue";
import ts_AttributeWithValues from "@/types/attributes/ts_attributesWithValues";
import { AttributeType } from "@/types/categories/attributes";
// import ts_productAttributes from "@/types/products/ts_productAttributes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(a: NextRequest, b: any) {
  const { idCategory } = await a.json();

  const attributes = await getAttributesWithValues(idCategory);
  return NextResponse.json({
    attributes,
  });
}

async function getAttributesWithValues(
  idCategory: number
): Promise<ts_AttributeWithValues[]> {
  console.log({ idCategory });

  const attributes = await getAttributes(idCategory);

  const attributesWithValues = await Promise.all(
    attributes.map(async (attribute) => ({
      ...attribute,
      values: await getAttributeValues(attribute.id),
    }))
  );

  return attributesWithValues;
}

async function getAttributes(idCategory: number): Promise<AttributeType[]> {
  return await dbWorker(
    `
      select
        *
      from ${process.env.TABLE_PREFIX}_attributes
      where
        idCategory = ?
    `,
    [idCategory]
  );
}

async function getAttributeValues(
  idAttribute: number
): Promise<ts_attributeValue[]> {
  return dbWorker(
    `
      select
        *
      from ${process.env.TABLE_PREFIX}_attributes_values
      where
        idAttribute = ?
    `,
    [idAttribute]
  );
}
