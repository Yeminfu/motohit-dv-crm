import dbWorker from "@/db/dbWorker2";
import Link from "next/link";

export default async function Page() {
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
  ).catch((x) => x.result);
  return (
    <>
      <pre>{JSON.stringify(shops, null, 2)}</pre>
      {shops.map((shop) => (
        <tr key={shop.id}>
          <td>
            <Link href={`/reports/stock/${shop.id}`}>{shop.shopName}</Link>
          </td>
        </tr>
      ))}
    </>
  );
}
