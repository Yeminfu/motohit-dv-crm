import dbWorker from "@/db/dbWorker";
import ts_fullProduct from "@/types/products/ts_fullProduct";
import AuthedLayout from "@/utils/authedLayout";
import { Fragment } from "react";

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
            <table className="table" style={{ width: "auto" }}>
              <thead>
                <tr>
                  <td>Магазин</td>
                  <td>К-во на складе</td>
                </tr>
              </thead>
              <tbody>
                {stock.map(stockItem => <tr key={stockItem.id}>
                  <th>{stockItem.shopName}</th>
                  <td>{stockItem.count}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            Розничные цены
          </div>
          <div className="card-body">
            <table className="table" style={{ width: "auto" }}>
              <thead>
                <tr>
                  <td>Магазин</td>
                  <td>Р.ц.</td>
                </tr>
              </thead>
              <tbody>
                {retailPrices.map(priceItem => <tr key={priceItem.id}>
                  <th>{priceItem.shopName}</th>
                  <td><pre>{JSON.stringify(priceItem, null, 2)}</pre></td>
                </tr>)}
              </tbody>
            </table>
            {/* <pre>{JSON.stringify(retailPrices, null, 2)}</pre> */}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            Изображения
          </div>
          <div className="card-body">
            <div className="d-flex flex-wrap">
              {images.map((image) => <Fragment key={image.id}>
                <img src={`https://мотохит-дв.рф/images/` + image.name} alt="" style={{ margin: 5, maxWidth:200 }} />
              </Fragment>)}
            </div>
          </div>
        </div>
      </>
    </AuthedLayout>
  </>
}

async function getProduct(idProduct: number): Promise<
  Pick<ts_fullProduct,
    "id" | "name" | "description"
  >> {
  return await dbWorker(`
    select
      id,
      name,
      slug,
      description,
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

async function getStockByProduct(idProduct: number): Promise<{
  id: number
  shopName: string
  count: number
  idProduct: number
  idShop: number
}[]> {
  return await dbWorker(`
    select
      stock.id,
      stock.idProduct,
      stock.idShop,
      stock.count,
      shops.shopName
    from chbfs_stock stock
      left join chbfs_shops shops 
      on 
        shops.id = stock.idShop
    where
      idProduct = ?
  `, [idProduct])
}

async function getRetailPriceByProduct(idProduct: number): Promise<{
  id: number
  created_date: Date
  idPriceType: number
  priceValue: number
  idProduct: number
  idShop: number
  shopName: string

}[]> {
  return await dbWorker(`
    select
      prices.*,
      shops.shopName
    from chbfs_retail_prices prices
      left join chbfs_shops shops 
      on 
        shops.id = prices.idShop
    where idProduct = ?
  `, [idProduct])
}

async function getProductImages(idProduct: number): Promise<{
  id: number
  name: string
}[]> {
  return await dbWorker(`
    select
      *
    from chbfs_products_images
    where idProduct = ?
  `, [idProduct])
}
