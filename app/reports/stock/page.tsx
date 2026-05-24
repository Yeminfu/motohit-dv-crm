import AuthedLayout from "@/utils/authedLayout";
import StockNavigation from "./components/navigation";

export default async function Page() {
  return (
    <>
      <AuthedLayout title="Склад">
        <StockNavigation />
      </AuthedLayout>
    </>
  );
}
