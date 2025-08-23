import dbWorker from "@/db/dbWorker2";
import AuthedLayout from "@/utils/authedLayout";
import { getCategoryById } from "@/utils/getCategoryById";
import getUserByToken from "@/utils/users/getUserByToken";
import { cookies } from "next/headers";
import ts_product from "./ts_product";
import Client from "./client";

export default async function Page(params: {
  params: { id: string };
}) {

  const authToken = String(cookies().get("auth")?.value);
  const user = await getUserByToken(authToken);

  if (!user) return <>error #d943j-</>

  const idCategory = params.params.id;

  const category = await getCategoryById(idCategory);

  const products = await getProducts(Number(idCategory));

  return <AuthedLayout title={category.category_name}>
    <Client products={products} />
  </AuthedLayout>

}

async function getProducts(idCategory: number): Promise<ts_product[]> {
  const products = await dbWorker(
    `
      select
        concat(products.id) as id,
        products.name,
        indexNumber,
        (
          select
            images.name
          from ${process.env.TABLE_PREFIX}_products_images as images
          where
            images.idProduct = products.id
          order by images.isMain
          limit 1
        ) as image
      from ${process.env.TABLE_PREFIX}_products as products
      where
        idCategory = ?
        and isArchived <> 1
      order by indexNumber;
    `, [idCategory]
  ).then(x => x.result);
  return products;
}