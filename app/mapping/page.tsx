import AuthedLayout from "@/utils/authedLayout";
import dbWorker from "@/db/dbWorker";
import ts_productMatch from "./ts_productMatch";
import Client from "./client";

export default async function Page() {
  const matches = await getMatches();
  const count = await getMatchesCountTotal();
  return <>
    <AuthedLayout title="Mapping">
      <>
        ({count})
        <Client matches={matches} />
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
  where
    productsFromMapping.isValid = 1
  `, []);
  return matches;
}

async function getMatchesCountTotal(): Promise<number> {
  const matches = await dbWorker(`
    select
      count(1) count
  from motohit_dv_mapping.products as productsFromMapping
      left join
          motohit_27_crm.birm_products as productsFromOldCRM 
      on
          productsFromOldCRM.id = productsFromMapping.idProductFromOldCrm
      left join
          motohit_dv.products as productsFromShop 
      on
          productsFromShop.id = productsFromMapping.idProductFromShop
  where
    productsFromMapping.isValid is null
  `, []);
  console.log('matches', matches[0]);

  return matches[0].count;
}