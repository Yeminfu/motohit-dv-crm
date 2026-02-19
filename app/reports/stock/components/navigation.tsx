import dbWorker from "@/db/dbWorker2";
import Link from "next/link";

export default async function StockNavigation() {
  const shops: {
    id: number;
    shopName: string;
  }[] = await dbWorker(
    `
    select 
      id,
      shopName
    from chbfs_shops    
  `,
    [],
  ).then((x) => x.result);

  return (
    <>
      <table>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop.id}>
              <td>
                <Link href={`/reports/stock/${shop.id}`}>{shop.shopName}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
