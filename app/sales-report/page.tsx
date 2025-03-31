import dbConnection from "@/db/connect";
import AuthedLayout from "@/utils/authedLayout";
// import getAllCategories from "@/utils/getAllCategories";
// import getShops from "@/utils/getShops";
// import dayjs from "dayjs";
// import ts_reportItem from "./ts_reportItem";
// import Client from "./client";
import ts_searchParams from "./ts_searchParams";

export default async function Page(params: { searchParams: ts_searchParams }) {
  // const categories = await getAllCategories();

  // const year = params.searchParams.year || dayjs().format('YYYY');
  // const idCategory = params.searchParams.category || categories[0]?.id;

  // if (!idCategory) return <>Такой страницы не существует</>

  // const reportData = await getYearReportData(
  //   Number(year),
  //   idCategory,
  // );
  // const shops = await getShops();
  const sales = await getSales();

  return <AuthedLayout title="Годовой отчет">
    <>
      <table className="table table-bordered table-striped w-auto">
        <thead>
          <tr>
            {Object.keys(sales[0]).map((value, i) => <th key={i}>
              {value}
            </th>)}
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, i) => <tr key={i}>
            {Object.values(sale).map((value, i1) => <td key={i1}>{value}</td>)}
          </tr>)}
        </tbody>
      </table>
      {/* <Client shops={shops} report={reportData} categories={categories} searchParams={params.searchParams} /> */}
    </>
  </AuthedLayout>
}

// async function getYearReportData(year: number, idCategory: number): Promise<ts_reportItem[]> {
//   const soldProducts = await getSoldProductsPerYear(year, idCategory);
//   const shops = await getShops();

//   const data = await Promise.all(soldProducts.map(async product => {
//     const salesPerShops = await Promise.all(shops.map(async shop => {
//       const sales = await getSales(product.idProduct, shop.id, year);
//       return {
//         idshop: shop.id,
//         ...sales
//       }
//     }));
//     return {
//       ...product,
//       sales: salesPerShops
//     };
//   }));

//   return data;
// }


// async function getSoldProductsPerYear(year: number, idCategory: number): Promise<{ idProduct: number, productName: string }[]> {
//   const connection = await dbConnection();
//   const res = await connection.query(`
//     select
//       distinct S.idProduct, P.name as productName
//     from ${process.env.TABLE_PREFIX}_sales S
//       join ${process.env.TABLE_PREFIX}_products P on P.id = S.idProduct
//     where 
//       year(S.created_date) = ? 
//       and P.idCategory = ?

//     `, [year, idCategory])
//     .then(([x]: any) => x);
//   await connection.end();
//   return res;
// }

async function getSales(): Promise<{ год: number, месяц: number, категория: string, магазин: string, количество: number }[]> {
  const connection = await dbConnection();
  const qs = `
   select distinct
      year(S.created_date) as год
      ,case  
        when month(S.created_date) = 1 THEN 'Январь'
        when month(S.created_date) = 2 THEN 'Февраль'
        when month(S.created_date) = 3 THEN 'Март'
        when month(S.created_date) = 4 THEN 'Апрель'
        when month(S.created_date) = 5 THEN 'Май'
        when month(S.created_date) = 6 THEN 'Июнь'
        when month(S.created_date) = 7 THEN 'Июль'
        when month(S.created_date) = 8 THEN 'Август'
        when month(S.created_date) = 9 THEN 'Сентябрь'
        when month(S.created_date) = 10 THEN 'Октябрь'
        when month(S.created_date) = 11 THEN 'Ноябрь'
        when month(S.created_date) = 12 THEN 'Декабрь'
      END as месяц
      ,C.category_name as категория
      /*,P.idCategory idКатегории*/
      /*,S.idShop*/
      ,Sh.shopName as магазин
      ,sum(S.count) AS количество
      ,sum(S.sum) AS сумма
    from chbfs_sales S
      inner join chbfs_shops Sh on Sh.id = S.idShop
        inner join chbfs_products P on P.id = S.idProduct
          inner join chbfs_categories C on C.id = P.idCategory
    group by
      year(S.created_date)
      ,месяц
      ,C.category_name
      /*,P.idCategory*/
      ,S.idShop
      ,Sh.shopName
    order by год desc, месяц desc, магазин, категория;
  `;
  const res = await connection.query(qs)
    .then(([x]: any) => x)
  // .then(x => x[0]);
  await connection.end();
  return res;
}