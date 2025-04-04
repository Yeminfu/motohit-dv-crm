import AuthedLayout from "@/utils/authedLayout";
import getProducts from "./utils/getProducts";
import { EditIsActive } from "./components/editIsActive";

export default async function Page(a: { searchParams: { page: string } }) {

  const products = await getProducts(Number(a.searchParams.page));
  if (!products) return <>err #dfg9d5k</>
  return <>
    <AuthedLayout title="дубли">
      <>
        <table className="table-bordered">
          <thead style={{
            background: "#eee",
            position: "sticky" /* Делаем заголовки липкими */,
            top: 0 /* Устанавливаем верхнюю границу */,
            backgroundColor: "white" /* Фон заголовка */,
            zIndex: 1 /* Убедитесь, что заголовок выше других элементов */,
            border: "1px solid"
          }}>
            <tr>
              <th>товар</th>
              <th>в архиве</th>
              <th>закупочная цена</th>
              <th>тип себестоимости</th>
              <th>значение себестоимости</th>
              <th>описание</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => <tr key={product.idProduct1}>

              <td>
                <pre style={{ border: "auto" }}>1) <>{JSON.stringify(product.productName1)}</> ({product.idProduct1})</pre>
                <pre style={{ border: "auto" }}>2) <>{JSON.stringify(product.productName2)}</> ({product.idProduct2})</pre>
              </td>
              <td>
                <div>
                  <EditIsActive idProduct={product.idProduct1} isArchived={product.isArchived1} />
                </div>
                <div>
                  <EditIsActive idProduct={product.idProduct2} isArchived={product.isArchived2} />
                </div>
              </td>
              <td>
                <pre style={{ border: "auto" }}>{JSON.stringify(product.purchase_price1)}</pre>
                <pre style={{ border: "auto" }}>{JSON.stringify(product.purchase_price2)}</pre>
              </td>
              <td>
                <pre style={{ border: "auto" }}>{JSON.stringify(product.idCostPriceType1)}</pre>
                <pre style={{ border: "auto" }}>{JSON.stringify(product.idCostPriceType2)}</pre>
              </td>
              <td>
                <pre style={{ border: "auto" }}>{JSON.stringify(product.costPriceValue1)}</pre>
                <pre style={{ border: "auto" }}>{JSON.stringify(product.costPriceValue2)}</pre>
              </td>
              <td >
                <div style={{ maxWidth: "200px", overflow: "scroll" }}>
                  <div className="text-nowrap">{product.description1}</div>
                  <div className="text-nowrap">{product.description2}</div>
                </div>
              </td>
              <td >
                {JSON.stringify({
                  page: product.page,
                  perPage: product.perPage,
                  offset: product.offset,
                })}
              </td>
            </tr>)}
          </tbody>
        </table>
        {/* <pre style={{ border: "auto" }}>{JSON.stringify(products, null, 2)}</pre> */}
      </>
    </AuthedLayout>
  </>
}
