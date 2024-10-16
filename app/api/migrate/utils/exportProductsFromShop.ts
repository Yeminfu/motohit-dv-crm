import dbWorker from "@/db/dbWorker";

export default async function exportProductsFromShop() {

  const productsFromShop: {
    id: number
    product_name: string
    category: number
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

  for (let index = 0; index < productsFromShop.length; index++) {
    const productFromShop = productsFromShop[index];
    // console.log('productFromShop', productFromShop);

    const matchRes = await dbWorker(`
      select
        *
      from motohit_dv_mapping.products
      where
        idProductFromShop = ? 
    `, [productFromShop.id]);


    // let match;

    if (matchRes.length) {
      const match = matchRes.pop();
      // const productFromOldCRM = await dbWorker(`
      //   select
      //     *
      //   from motohit_27_crm.birm_products
      //   where
      //     id = ?
      // `, [matchRes.pop().idProductFromOldCRM]);

      console.log('productFromOldCRM', match.idProductFromOldCrm);
    }

    // console.log('match', match);

    // await createProduct({
    //   id: productFromShop.id,
    //   name: productFromShop.product_name,
    //   idCategory: productFromShop.category,
    //   purchase_price: productFromShop,
    //   idCostPriceType: number,
    //   costPriceValue: number,
    //   color: string,
    //   code: string,
    //   note: string,
    //   isArchived: boolean
    // })

    // break;
  }

  const categoriesFromShop = await dbWorker(`
      insert into motohit_dv_crm.chbfs_products
      (
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
      )
      select 
        id,
        product_name,
        category,
        100,
        1,
        1,
        'green',
        'code',
        'note',
        0
      from motohit_dv.products;
  `, []).then(x => x[0]);

  // console.log('categoriesFromShop', categoriesFromShop);
}


async function createProduct(productFromNewCRM: {
  id: number,
  name: string,
  idCategory: number,
  purchase_price: number,
  idCostPriceType: number,
  costPriceValue: number,
  color: string,
  code: string,
  note: string,
  isArchived: boolean
}) {

  console.log('productFromNewCRM', productFromNewCRM);


}