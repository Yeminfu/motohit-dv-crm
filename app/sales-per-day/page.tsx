import dbConnection from "@/db/connect";
import AuthedLayout from "@/utils/authedLayout";
export default async function Page() {
  const sales = await getSales();

  return <AuthedLayout title="Продажи за день">
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
    </>
  </AuthedLayout>
}


async function getSales(): Promise<{ товар: string, категория: string, бир: number, хаб: number, блг: number }[]> {
  const connection = await dbConnection();
  const qs = `
    select
      P.id AS id,
      P.name AS товар,
      C.category_name AS категория,
      getSalesSumPerProductAndShopToday(P.id,1) AS 'сумма бир',
      getSalesCountPerProductAndShopToday(P.id,1) AS 'к-во бир',
      getSalesSumPerProductAndShopToday(P.id,2) AS 'сумма хаб',
      getSalesCountPerProductAndShopToday(P.id,2) AS 'к-во хаб',
      getSalesSumPerProductAndShopToday(P.id,3) AS 'сумма блг',
      getSalesSumPerProductAndShopToday(P.id,3) AS 'к-во блг' 
    from (chbfs_products P 
    join chbfs_categories C on((C.id = P.idCategory))) 
    where 
      (
        (
          getSalesSumPerProductAndShopToday(P.id,1)
          + getSalesSumPerProductAndShopToday(P.id,2)
          + getSalesSumPerProductAndShopToday(P.id,3)
        ) > 0) 
    order by C.id
  `;
  const res = await connection.query(qs)
    .then(([x]: any) => x)
  await connection.end();
  return res;
}