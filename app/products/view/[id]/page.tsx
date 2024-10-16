import dbWorker from "@/db/dbWorker";
import AuthedLayout from "@/utils/authedLayout";

export default async function Page(b: { params: { id: number } }) {
  const product = await getProduct(b.params.id);
  console.log('product', product);

  return <>
    <AuthedLayout title="товар какойто">
      <>
        <pre>{JSON.stringify({ product }, null, 2)}</pre>
      </>
    </AuthedLayout>
  </>
}

async function getProduct(idProduct: number) {
  return await dbWorker(`
    select
      *
    from chbfs_products
    where id = ?
  `, [idProduct])
}