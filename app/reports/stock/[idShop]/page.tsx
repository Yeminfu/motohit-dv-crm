import AuthedLayout from "@/utils/authedLayout";
import StockNavigation from "../components/navigation";
import dbWorker from "@/db/dbWorker2";
import { Key } from "react";

export default async function Page(props: { params: { idShop: string } }) {
  const shop = await dbWorker(`select shopName from chbfs_shops where id = ?`, [
    props.params.idShop,
  ]).then((x) => x.result.pop().shopName);

  const stock = await dbWorker(
    `
      set @idShop = ?;

      select
        shop.shopName as магазин,
        cat.category_name as категория,
        prod.name as товар,
        stock.count as "к-во на складе"
      from chbfs_stock as stock
        inner join chbfs_products prod on prod.id = stock.idProduct
        inner join chbfs_categories cat on cat.id = prod.idCategory
        inner join chbfs_shops shop on shop.id = stock.idShop
      where
        1 = 1
        and stock.idShop = @idShop
        and prod.isArchived = 0
        and stock.count <> 0
      order by prod.idCAtegory  
    `,
    [Number(props.params.idShop)],
  ).then((x) => x.result[1]);

  return (
    <>
      <AuthedLayout title={`Склад ${shop}`}>
        <StockNavigation />
        <div className="mt-2"></div>
        <h3>Товар на складе</h3>
        <table className="table table-sm w-auto table-bordered table-striped">
          <thead>
            <tr>
              {Object.keys(stock[0]).map((x, i) => (
                <th key={i}>{x}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stock.map(
              (
                el: { [s: string]: unknown } | ArrayLike<unknown>,
                i: Key | null | undefined,
              ) => (
                <tr key={i}>
                  {(() => {
                    //@ts-ignore
                    const values: string[] = Object.values(el);
                    return values.map((x: string, i2: number) => <td key={i2} style={{maxWidth:200}}>{x}</td>);
                  })()}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </AuthedLayout>
    </>
  );
}
