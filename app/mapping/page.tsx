import AuthedLayout from "@/utils/authedLayout";
import dbWorker from "@/db/dbWorker";
import ts_productMatch from "./ts_productMatch";
import Client from "./client";
import CreateProduct from "@/utils/products/createProduct/createProduct";

export default async function Page() {
  const products = await getMatches();

  for (let index = 0; index < products.length; index++) {
    const productFromMatches = products[index];
    // CreateProduct()
    break;
  }

  return (
    <>
      <AuthedLayout title="Mapping">
        <>
          <Client matches={products} />
        </>
      </AuthedLayout>
    </>
  );
}

async function getMatches(): Promise<ts_productMatch[]> {
  const matches = await dbWorker(
    `
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
  `,
    []
  );
  return matches;
}
