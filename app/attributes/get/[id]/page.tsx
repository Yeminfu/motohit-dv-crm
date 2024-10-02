import dbWorker from "@/db/dbWorker";
import { AttributeType } from "@/types/categories/attributes";
import AuthedLayout from "@/utils/authedLayout";

export default async function Page(a: { params: { id: string } }) {
  const attribute = await getAttributeById(1);

  return <AuthedLayout title={String(attribute?.attribute_name)}>Атрибут № {a.params.id}</AuthedLayout>
}

async function getAttributeById(idAttribute: number): Promise<AttributeType | undefined> {
  const attributes = await dbWorker(`
    select
      *
    from
      ${process.env.TABLE_PREFIX}_attributes
    where
      id = ?
  `, [idAttribute]);
  if (!attributes.length) return undefined;
  return attributes.pop();
}