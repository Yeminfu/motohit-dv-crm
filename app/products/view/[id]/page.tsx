import dbWorker from "@/db/dbWorker";
import AuthedLayout from "@/utils/authedLayout";

export default async function Page(b: { params: { id: number } }) {
  const [product] = await getProduct(b.params.id);
  if (!product) return null;

  const stock = await getStockByProduct(product.id);
  const retailPrices = await getRetailPriceByProduct(product.id);
  const images = await getProductImages(product.id);

  return <>
    <AuthedLayout title={product.name}>
      <>
        <div className="card">
          <div className="card-header">
            Основные данные
          </div>
          <div className="card-body">
            <table className="table w-auto">
              <tbody>
                {(() => {
                  const values = Object.values(product);
                  return Object.keys(product).map((key, i) => <tr key={key}>
                    <th>{key}</th>
                    <td>{String(values[i])}</td>
                  </tr>)
                })()}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            Склад
          </div>
          <div className="card-body">
            <pre>{JSON.stringify(stock, null, 2)}</pre>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            Рзничные цены
          </div>
          <div className="card-body">
            <pre>{JSON.stringify(retailPrices, null, 2)}</pre>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            Изображения
          </div>
          <div className="card-body">
            <pre>{JSON.stringify(images, null, 2)}</pre>
          </div>
        </div>
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
      name,
      idCategory,
      purchase_price,
      idCostPriceType,
      costPriceValue,
      color,
      code,
      note,
      isArchived
    from chbfs_products
    where id = ?
  `, [idProduct])
}


async function getStockByProduct(idProduct: number) {
  return await dbWorker(`
    select
      *
    from chbfs_stock
    where idProduct = ?
  `, [idProduct])
}

async function getRetailPriceByProduct(idProduct: number) {
  return await dbWorker(`
    select
      *
    from chbfs_retail_prices
    where idProduct = ?
  `, [idProduct])
}

async function getProductImages(idProduct: number) {
  return await dbWorker(`
    select
      *
    from chbfs_products_images
    where idProduct = ?
  `, [idProduct])
}