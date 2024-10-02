import dbWorker from "@/db/dbWorker";
import { AttributeType } from "@/types/categories/attributes";
import AuthedLayout from "@/utils/authedLayout";

export default async function Page(a: { params: { id: string } }) {
  const attributes = await getAttributes(Number(a.params.id))
  return <AuthedLayout title="название категории">
    page {a.params.id}
    
    <pre>{JSON.stringify(attributes, null, 2)}</pre>
  </AuthedLayout>
}

async function getAttributes(idCategory: number): Promise<AttributeType> {
  return await dbWorker(`
    select
      *
    from ${process.env.TABLE_PREFIX}_attributes
    where
      idCategory = ?
  `, [idCategory])
}