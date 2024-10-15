import AuthedLayout from "@/utils/authedLayout";
import getPRoductsFromShop from "./getPRoductsFromShop";

export default async function Page() {
  const productsFromShop = await getPRoductsFromShop()

  return <>
    <AuthedLayout title="Mapping">
      <>
        <table className="table table-bordered striped">
          <tbody>
            {productsFromShop.map(productFromShop => {
              return <tr key={productFromShop.id}>
                <td>{productFromShop.id}</td>
                <td>{productFromShop.product_name}</td>
              </tr>
            })}
          </tbody>
        </table>
      </>
    </AuthedLayout>
  </>
}

