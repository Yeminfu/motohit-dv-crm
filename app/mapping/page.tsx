import AuthedLayout from "@/utils/authedLayout";
import dbWorker from "@/db/dbWorker";
import ts_productMatch from "./ts_productMatch";

export default async function Page() {
  const matches = await getMatches();

  return <>
    <AuthedLayout title="Mapping">
      <>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Товар из магазина</th>
              <th>Совпадения (товары из старой crm)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {matches.map(product => <tr key={product.idProductFromMapping}>
              <td>{product.nameFromShop}</td>
              <td>{product.nameFromOldCrm}</td>
              <td>
                <div className="d-flex">
                  <button className="btn btn-success me-2">Подтвердить</button>
                  <button className="btn btn-danger">Отмена</button>
                </div>
              </td>
            </tr>)}
          </tbody>
        </table>
      </>
    </AuthedLayout>
  </>
}

async function getMatches(): Promise<ts_productMatch[]> {
  const matches = await dbWorker(`
    select
      productsFromMapping.id as idProductFromMapping,
      productsFromMapping.idProductFromShop as idProductFromShop,
      productsFromMapping.idProductFromOldCrm as idProductFromOldCrm,
      productsFromOldCRM.name as nameFromOldCrm,
      productsFromShop.product_name as nameFromShop
  from motohit_dv_mapping.products as productsFromMapping
      left join
          motohit_27_crm.birm_products as productsFromOldCRM 
      on
          productsFromOldCRM.id = productsFromMapping.idProductFromOldCrm
      left join
          motohit_dv.products as productsFromShop 
      on
          productsFromShop.id = productsFromMapping.idProductFromShop
  `, []);
  console.log('matches', matches);

  return matches;
}