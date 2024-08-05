import dbConnection from "@/db/connect";
import AuthedLayout from "@/utils/authedLayout";
import getAllCategories from "@/utils/getAllCategories";
import getShops from "@/utils/getShops";
import dayjs from "dayjs";
import ts_reportItem from "./ts_reportItem";
import Client from "./client";

export default async function Page() {
  const categories = await getAllCategories();
  const idFirstCategory = categories[0].id;
  const reportData = await getYearReportData(Number(dayjs().format('YYYY')), idFirstCategory);
  const shops = await getShops();
  return <AuthedLayout title="Годовой отчет">
    <>
      <Client shops={shops} report={reportData} />
    </>
  </AuthedLayout>
}

async function getYearReportData(year: number, idCategory: number): Promise<ts_reportItem[]> {
  const soldProducts = await getSoldProductsPerYear(year, idCategory);
  const shops = await getShops();

  const data = await Promise.all(soldProducts.map(async product => {
    const salesPerShops = await Promise.all(shops.map(async shop => {
      const sales = await getSales(product.idProduct, shop.id, year);
      return {
        idshop: shop.id,
        ...sales
      }
    }));
    return {
      ...product,
      sales: salesPerShops
    };
  }));

  return data;
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
       
    `, [year/*, idCategory*/]) //ВОССТАНОВИТЬ ОТБОР ПО КАТЕГОРИЯМ КАТЕГОРИЮ
    .then(([x]: any) => x);
  await connection.end();
  return res;
}

async function getSales(idProduct: number, idShop: number, year: number): Promise<{ count: number, sum: number }> {
  const connection = await dbConnection();
  const qs = `
  select
    count(count) as count,
    sum(sum*count) as sum
  from ${process.env.TABLE_PREFIX}_sales S
  where 
    year(S.created_date) = ? 
    and S.idProduct = ?
    and S.idShop = ?
  `;
  const res = await connection.query(qs, [year, idProduct, idShop])
    .then(([x]: any) => x.pop());
  await connection.end();
  return res;
}