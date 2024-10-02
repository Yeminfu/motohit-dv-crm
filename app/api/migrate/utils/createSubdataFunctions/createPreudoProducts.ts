import { createProductInDB } from "@/app/api/products/create/createProductInDB";
import createAttribute from "@/db/crud/createAttribute";
import dbWorker from "@/db/dbWorker";
import { ProductOnCreate } from "@/types/products/prodyctType";

export default async function createPreudoProducts() {

  const categories = await getCategories();
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];

    const res = await createProductInDB({
      name: "Товар 1" + category.id,
      color: "#000",
      purchase_price: 1200,
      cost_price: {
        type: 1,
        value: 123
      },
      code: '123123d',
      note: 'vmfk3',
      retail_price: [],
      stock: [{
        idShop: 1,
        shopName: 'stt',
        count: 123
      }],
      idCategory: 1
    });

    console.log('res', res);

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
