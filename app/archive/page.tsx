import dbConnection from "@/db/connect";
import { ProductFromDB } from "@/types/products/prodyctType";
import AuthedLayout from "@/utils/authedLayout";
import ReturnProductFromArchive from "./ReturnProductFromArchive";

export default async function Page() {
  const products = await getProductsFromArchive();
  return (
    <>
      <AuthedLayout title="Архив">
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>Наименование</th>
                <th>Код</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.code}</td>
                  <td>
                    <ReturnProductFromArchive
                      idProduct={product.id}
                      productName={product.name}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </AuthedLayout>
    </>
  );
}

async function getProductsFromArchive(): Promise<ProductFromDB[]> {
  const connection = await dbConnection();
  const products = await connection
    .query(
      `select * from ${process.env.TABLE_PREFIX}_products where isArchived = 1`
    )
    .then(([x]: any) => x)
    .catch((err) => {
      console.error("err #fj48", err);
      return [];
    });
  await connection.end();
  return products;
}
