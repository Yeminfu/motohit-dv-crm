import dbWorker from "@/db/dbWorker";
import AuthedLayout from "@/utils/authedLayout";

export default async function Page(b: { params: { id: number } }) {
  const [product] = await getProduct(b.params.id);
  console.log('product', product);

  if (!product) return null;

  return <>
    <AuthedLayout title={product.name}>
      <>
        <pre>{JSON.stringify({ product }, null, 2)}</pre>
      </>
    </AuthedLayout>
  </>
}

async function getProduct(idProduct: number): Promise<{
  id: number
  name: string
  idCategory: number,
  purchase_price: number,
  idCostPriceType: number | null,
  costPriceValue: number | null,
  color: string | null,
  code: string | null,
  note: string | null,
  isArchived: boolean,
}[]> {
  return await dbWorker(`
    select
      id,
      name
    from chbfs_products
    where id = ?
  `, [idProduct])
}