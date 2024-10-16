import dbWorker from "@/db/dbWorker";
import ts_fullProduct from "@/types/products/ts_fullProduct";
import AuthedLayout from "@/utils/authedLayout";

export default async function Page(b: { params: { id: number } }) {
  const product = await getProduct(b.params.id);
  const productColumns = await getProductColumnsFullData();

  if (!product) return <>Нет такой страницы</>;

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
                  return Object.keys(product).map((key, i) => {
                    return <tr key={key}>
                      <th>{productColumns[key] || key}</th>
                      <td>{String(values[i])}</td>
                    </tr>
                  })
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
            Розничные цены
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

async function getProduct(idProduct: number): Promise<
  Pick<ts_fullProduct,
    "id" | "name"
  >> {
  return await dbWorker(`
    select
      id,
      name,
      slug,
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
  `, [idProduct]).then(x => x[0])
}

async function getProductColumnsFullData(): Promise<{ [k: string]: string; }> {

  const res = await dbWorker(`SHOW FULL COLUMNS FROM motohit_dv_crm.chbfs_products;`, []);

  const obj: [string, string][] = res.map((x: {
    Comment: string; Field: string;
  }) => ([
    x.Field, x.Comment
  ]));

  const val = Object.fromEntries(obj);

  return val;
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