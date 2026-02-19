import AuthedLayout from "@/utils/authedLayout";
import StockNavigation from "../components/navigation";
import dbWorker from "@/db/dbWorker2";

export default async function Page(props: { params: { idShop: string } }) {
  const shop = await dbWorker(`select shopName from chbfs_shops where id = ?`, [
    props.params.idShop,
  ]).then((x) => x.result.pop().shopName);

  return (
    <>
      <AuthedLayout title={`Склад ${shop}`}>
        <StockNavigation />
      </AuthedLayout>
    </>
  );
}
