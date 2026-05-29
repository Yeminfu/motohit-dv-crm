import dbConnection from "@/db/connect";
import { ProductFromDB } from "@/types/products/prodyctType";
import AuthedLayout from "@/utils/authedLayout";
import ReturnProductFromArchive from "./ReturnProductFromArchive";
import Filter from "./components/filter";

export default async function Page(props:{
  searchParams:{
    productName?:string
    limit:string
  }
}) {
  const products = await getProductsFromArchive(props.searchParams);
  return (
    <>
      <AuthedLayout title="Архив">
        <>
        <div className="mb-4">
          <Filter searchParams={props.searchParams}/>
        </div>
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

async function getProductsFromArchive(props:{
  productName?:string
}): Promise<ProductFromDB[]> {
  const connection = await dbConnection();
  let sql = `select
        p.*
      from ${process.env.TABLE_PREFIX}_products p
      where
        isArchived = 1`;

  if(props.productName){
    sql+= ` and name like '%${props.productName}%'`
  }

  const products = await connection
    .query(sql
    ,[props.productName])
    .then(([x]: any) => x)
    .catch((err) => {
      console.error("err #fj48", err);
      return [];
    });
    
  await connection.end();
  return products;
}
