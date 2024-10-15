import AuthedLayout from "@/utils/authedLayout";
import getPRoductsFromShop from "./getPRoductsFromShop";
import getMatches from "./getMatches";
import ts_productFromShopWithMatches from "./ts_productFromShopWithMatches";

export default async function Page() {
  const productsFromShop = await getPRoductsFromShop();
  const productsWithMatches: ts_productFromShopWithMatches[] = await Promise.all(
    productsFromShop
      .map(async (productFromShop) => {
        const matches = await getMatches(productFromShop.id)
        return {
          ...productFromShop,
          matches: matches
        }
      }));

  return <>
    <AuthedLayout title="Mapping">
      <>
        <table className="table table-bordered striped">
          <thead>
            <tr>
              <th>Товар из магазина</th>
              <th>Совпадения (товары из старой crm)</th>
            </tr>
          </thead>
          <tbody>
            {productsWithMatches.map(productFromShop => {
              return <tr key={productFromShop.id}>
                <td>{productFromShop.product_name}</td>
                <td>
                  <table className="table striped">
                    <tbody>
                      {productFromShop.matches.map(match => <tr key={match.id}>
                        <td>
                          <div style={{ width: 400 }}>
                            {match.productFromOldCRM.name}
                          </div>
                        </td>
                        <td>
                          <button className="btn btn-success">Подтвердить</button>
                          <button className="btn btn-danger">Отмена</button>
                        </td>
                      </tr>)}
                    </tbody>
                  </table>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </>
    </AuthedLayout>
  </>
}
