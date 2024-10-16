import dbWorker from "@/db/dbWorker";

export default async function exportProductsFromShop() {
  const productsFromShop = await getProductsFromShop();

  for (let index = 0; index < productsFromShop.length; index++) {
    const productFromShop = productsFromShop[index];

    const matchRes:
      {
        id: number
        idProductFromOldCrm: number
      }[] = await dbWorker(
        `
          select
            *
          from motohit_dv_mapping.products
          where
            idProductFromShop = ? 
        `, [productFromShop.id]);

    if (matchRes.length) {
      const match = matchRes.pop();

      if (match) {

        const [productFromOldCRM]: {
          purchase_price: string; //'47000'
          cost_value: string; //'1.1'
          cost_type: string; //'percent'
          title_color: string; //'black'
          code: string; //'shc83'
          note: string; //'shc83'
          archive: boolean;
        }[]
          = await dbWorker(`
          select
            *
          from motohit_27_crm.birm_products
          where
            id = ?
        `, [match.idProductFromOldCrm]);

        const priceType = {
          fix: 1,
          handle: 2,
          percent: 3,
        }

        await createProduct({
          id: productFromShop.id,
          name: productFromShop.product_name,
          slug: productFromShop.slug,
          idCategory: productFromShop.category,
          purchase_price: Number(productFromOldCRM.purchase_price),
          //@ts-ignore
          idCostPriceType: priceType[productFromOldCRM.cost_type] || null,
          costPriceValue: Number(productFromOldCRM.cost_value),
          color: productFromOldCRM.title_color,
          code: productFromOldCRM.code,
          note: productFromOldCRM.note,
          isArchived: !productFromShop.is_active
        })
      }
    } else {

      await createProduct({
        id: productFromShop.id,
        name: productFromShop.product_name,
        idCategory: productFromShop.category,
        purchase_price: 0,
        slug: productFromShop.slug,
        idCostPriceType: null,
        costPriceValue: null,
        color: null,
        code: null,
        note: null,
        isArchived: !productFromShop.is_active
      })
    }
    // break;
  }

  // const categoriesFromShop = await dbWorker(`
  //     insert into motohit_dv_crm.chbfs_products
  //     (
  //       id,
  //       name,
  //       idCategory,
  //       purchase_price,
  //       idCostPriceType,
  //       costPriceValue,
  //       color,
  //       code,
  //       note,
  //       isArchived
  //     )
  //     select 
  //       id,
  //       product_name,
  //       category,
  //       100,
  //       1,
  //       1,
  //       'green',
  //       'code',
  //       'note',
  //       0
  //     from motohit_dv.products
  //     where name not in (
  //       select name from motohit_dv_crm.chbfs_products
  //     );
  // `, []).then(x => x[0]);

  // console.log('categoriesFromShop', categoriesFromShop);
}

async function createProduct(productFromNewCRM: {
  id: number,
  name: string,
  slug: string,
  idCategory: number,
  purchase_price: number,
  idCostPriceType: number | null,
  costPriceValue: number | null,
  color: string | null,
  code: string | null,
  note: string | null,
  isArchived: boolean
}) {

  console.log('productFromNewCRM', productFromNewCRM);

  await dbWorker(`
    insert into motohit_dv_crm.chbfs_products
    (
      ${Object.keys(productFromNewCRM)}
    )
    values
    (
      ${Object.values(productFromNewCRM).map(_ => '?')}
    )

  `, Object.values(productFromNewCRM));


}

async function getProductsFromShop() {

  const productsFromShop: {
    id: number
    product_name: string
    slug: string
    category: number
    is_active: boolean;
  }[] = await dbWorker(`
    select
      id,
      created_date,
      created_by,
      is_active,
      stock_status,
      product_name,
      slug,
      --description,
      price,
      category,
      index_number,
      short_description
    from motohit_dv.products
  `, []);
  return productsFromShop;
}