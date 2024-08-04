import dbConnection from "@/db/connect";
import AuthedLayout from "@/utils/authedLayout";
import getAllCategories from "@/utils/getAllCategories";
import getShops from "@/utils/getShops";
import dayjs from "dayjs";

export default async function Page() {
  const categories = await getAllCategories();
  const idFirstCategory = categories[0].id;
  const data = await getYearReportData(Number(dayjs().format('YYYY')), idFirstCategory);
  return <AuthedLayout title="Годовой отчет">
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  </AuthedLayout>
}

async function getYearReportData(year: number, idCategory: number) {
  const soldProducts = await getSoldProductsPerYear(year, idCategory);

  const shops = await getShops()

  for (let index = 0; index < soldProducts.length; index++) {
    const product = soldProducts[index];

    console.log('product', product);

    console.log('shops', shops);

    for (let index1 = 0; index1 < shops.length; index1++) {
      const element = shops[index1];
    }

  }

  return soldProducts;
}

async function getSoldProductsPerYear(year: number, idCategory: number): Promise<{ idProduct: number, productName: string }[]> {
  const connection = await dbConnection();
  const res = await connection.query(`
    select
      distinct S.idProduct, P.name as productName
    from ${process.env.TABLE_PREFIX}_sales S
      join chbfs_products P on P.id = S.idProduct
    where 
      year(S.created_date) = ? 
      and P.idCategory = ?
    `, [year, idCategory])
    .then(([x]: any) => x);
  await connection.end();
  return res;
}

async function getSales(idProduct: number, idShop: number, year: number) {
  const connection = await dbConnection();
  const res = await connection.query(`
    select
      *
    from ${process.env.TABLE_PREFIX}_sales S
    where 
      year(S.created_date) = ? 
      and S.idPriduct = ?
    `, [idProduct, idShop, year])
    .then(([x]: any) => x);
  await connection.end();
  return res;
}