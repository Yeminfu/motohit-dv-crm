import dbWorker from "#db/dbWorker2.js";
import Link from "next/link";

export default async function Page(props: any) {
  return (
    <>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  );
  //   const shops: {
  //     id: number;
  //     shopName: string;
  //   }[] = await dbWorker(
  //     `
  //     select
  //       id,
  //       shopName
  //     from chbfs_shops
  //   `,
  //     [],
  //   ).catch((x) => x.result);
  //   return (
  //     <>
  //       {shops.map((shop) => (
  //         <tr key={shop.id}>
  //           <td>
  //             <Link href={`/reports/stock/${shop.id}`}>{shop.shopName}</Link>
  //           </td>
  //         </tr>
  //       ))}
  //     </>
  //   );
}

// idShop;
