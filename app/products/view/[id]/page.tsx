import AuthedLayout from "@/utils/authedLayout";
import { Fragment } from "react";
import getAttributes from "./utils/getAttributes";
import getProduct from "./utils/getProduct";
import getProductColumnsFullData from "./utils/getProductColumnsFullData";
import getProductImages from "./utils/getProductImages";
import getProductRetailPrices from "./utils/getProductRetailPrices";
import getStockByProduct from "./utils/getStockByProduct";
import PartWrapper from "./components/partWrapper";
import createPriceWithMarkup from "@/utils/prices/createPriceWithMarkup";

export default async function Page(b: { params: { id: number } }) {
  const product = await getProduct(b.params.id);
  const productColumns = await getProductColumnsFullData();

  if (!product) return <>Нет такой страницы</>;

  const stock = await getStockByProduct(product.id);

  const retailPrices = await getProductRetailPrices(product.id);
  const images = await getProductImages(product.id);

  const attributes = await getAttributes(product.id);

  return <>
    <AuthedLayout title={product.name}>
      <>
        <PartWrapper title="Основные данные">
          <table className="table table-bordered w-auto">
            <tbody>
              {(() => {
                const values = Object.values(product);
                return Object.keys(product).map((key, i) => {
                  return <tr key={key}>
                    <th>{productColumns[key] || key}</th>
                    <td><div dangerouslySetInnerHTML={{ __html: String(values[i]) }} /></td>
                  </tr>
                })
              })()}
            </tbody>
          </table>
        </PartWrapper>

        <PartWrapper title="Склад">
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
        </PartWrapper>

        <PartWrapper title="Розничные цены">
          <table className="table" style={{ width: "auto" }}>
            <thead>
              <tr>
                <td>Магазин</td>
                <td>Тип р.ц.</td>
                <td>Значение р.ц.</td>
                <td>Итог р.ц.</td>
              </tr>
            </thead>
            <tbody>
              {retailPrices.map(retailPriceItem => <tr key={retailPriceItem.id}>
                <th>{retailPriceItem.shopName}</th>
                <td>{retailPriceItem.idPriceType}</td>
                <td>{retailPriceItem.priceValue}</td>
                <td>{(() => {
                  const costPrice = createPriceWithMarkup(
                    product.purchase_price,
                    product.idCostPriceType,
                    product.costPriceValue
                  )
                  const retailPrice = createPriceWithMarkup(
                    costPrice,
                    retailPriceItem.idPriceType,
                    retailPriceItem.priceValue
                  )
                  return retailPrice;
                })()}</td>
              </tr>)}
            </tbody>
          </table>
        </PartWrapper>

        <PartWrapper title="Атрибуты">
          <table className="table" style={{ width: "auto" }}>
            <thead>
              <tr>
                <td>Атрибут</td>
                <td>Значение</td>
              </tr>
            </thead>
            <tbody>
              {attributes.map(attributeItem => <tr key={attributeItem.attribute_name}>
                <th>{attributeItem.attribute_name}</th>
                <td>{attributeItem.value_name}</td>
              </tr>)}
            </tbody>
          </table>
        </PartWrapper>

        <PartWrapper title="Изображения">
          <div className="d-flex flex-wrap">
            {images.map((image) => <Fragment key={image.id}>
              <img src={`https://мотохит-дв.рф/images/` + image.name} alt="" style={{ margin: 5, maxWidth: 200 }} />
            </Fragment>)}
          </div>
        </PartWrapper>
      </>
    </AuthedLayout>
  </>
}
