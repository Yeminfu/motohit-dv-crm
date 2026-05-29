import dbWorker from "@/db/dbWorker2";
import AuthedLayout from "@/utils/authedLayout";
import Filter from "./components/filter";

export default async function Page(pageProps: {
  searchParams: ts_searchParams;
}) {
  const history = await getHistory(pageProps.searchParams);
  return (
    <>
      <AuthedLayout title="История">
        <>
          {(() => {
            if (!history) {
              return <>err #kffd94j</>;
            }

            return (
              <>
                <div className="mb-4">
                  <Filter searchParams={pageProps.searchParams}/>
                </div>
                <table className="table table-bordered table-striped w-auto table-hover">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>дата</th>
                      <th>пользователь</th>
                      <th>магазин</th>
                      <th>товар</th>
                      <th>старое значение</th>
                      <th>новое значение</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((historyRow) => (
                      <tr key={historyRow.id}>
                        <td>{historyRow.id}</td>
                        <td>{historyRow.date}</td>
                        <td>{historyRow.user}</td>
                        <td>{historyRow.shop}</td>
                        <td>
                          <div style={{ maxWidth: "500px" }}>
                            {historyRow.product}
                          </div>
                        </td>
                        <td>{JSON.stringify(historyRow.oldValue)}</td>
                        <td>{JSON.stringify(historyRow.newValue)} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            );
          })()}
        </>
      </AuthedLayout>
    </>
  );
}

async function getHistory(
  searchParams: ts_searchParams,
): Promise<ts_historyInDB[] | undefined> {
  console.log({ searchParams });

  const limit = Number(searchParams.limit) || 1000;

  const productWhere = searchParams.productName ? `and p.name like '%${searchParams.productName}%'` : '';

  const sql = `
    select
      h.id
      ,json_extract(h.data, '$.oldValue') oldValue
      ,json_extract(h.data, '$.newValue') newValue
      ,json_extract(h.data, '$.idProduct') idProduct
      ,date_format(h.created_date, '%d.%m.%Y %h:%i %p') date
      ,u.name user
      ,p.name product
      ,sh.shopName shop
    from chbfs_history h
      left join chbfs_users u on u.id = h.doneBy
      left join chbfs_products p on p.id = json_extract(h.data, '$.idProduct')
      left join chbfs_shops sh on sh.id = json_extract(h.data, '$.idShop')
    where
      h.action = 'chbfs_stock'
      and json_extract(h.data, '$.oldValue') <> json_extract(h.data, '$.newValue')
      ${productWhere}
      order by h.id desc
    limit ${limit}
  `;

  const res = await dbWorker(sql, []);

  if (!res.result) {
    return;
  }
  return res.result;
}

interface ts_historyInDB {
  id: number;
  oldValue: number;
  newValue: number;
  idProduct: number;
  date: string;
  user: string;
  product: string;
  shop: string;
}

interface ts_searchParams {
  limit:    string;
  productName:string
}
