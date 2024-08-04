import dbConnection from "@/db/connect";
import Price from "@/ui/price";
import AuthedLayout from "@/utils/authedLayout";
import getAllCategories from "@/utils/getAllCategories";
import getShops from "@/utils/getShops";
import dayjs from "dayjs";

export default async function Page() {
  const categories = await getAllCategories();
  const idFirstCategory = categories[0].id;
  const data = await getYearReportData(Number(dayjs().format('YYYY')), idFirstCategory);
  const shops = await getShops();
  return <AuthedLayout title="Годовой отчет">
    <>
      <table className="table table-bordered tablestriped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Нименование</th>
            {shops.map(shop => <th key={shop.id}>{shop.shopName}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map(productSales => <tr key={productSales.idProduct}>
            <td>{productSales.idProduct}</td>
            <td>{productSales.productName}</td>

            {productSales.sales.map(salePerShopObj => <td key={salePerShopObj.idshop}>
              {salePerShopObj.count} /  <Price value={Number(salePerShopObj.sum)} />
            </td>)}

          </tr>)}
          <tr></tr>
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  </AuthedLayout>
}

async function getYearReportData(year: number, idCategory: number) {
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