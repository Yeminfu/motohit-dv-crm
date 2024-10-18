import { createProductInDB } from "@/app/api/products/create/createProductInDB";
import dbWorker from "@/db/dbWorker";

export default async function createPreudoProducts() {
  const categories = await getCategories();
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];

    // await createProductInDB({
    //   name: "Товар 1" + category.id,
    //   color: "#000",
    //   purchase_price: 1200,
    //   cost_price: {
    //     type: 1,
    //     value: 123
    //   },
    //   code: '123123d',
    //   note: 'vmfk3',
    //   retail_price: [],
    //   stock: [{
    //     idShop: 1,
    //     shopName: 'stt',
    //     count: 123
    //   }],
    //   idCategory: category.id
    // });

  }
}

async function getCategories() {
  return await dbWorker(`
    select  
      *
    from ${process.env.TABLE_PREFIX}_categories
    where
      id not in (
        select idParent from ${process.env.TABLE_PREFIX}_categories where idParent is not null
      )
  `, [])
}
