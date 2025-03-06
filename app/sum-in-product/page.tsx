import AuthedLayout from "@/utils/authedLayout";
import getSumInProduct from "./getSumInProduct";

export default async function Page() {
  const sumInProduct = await getSumInProduct();

  return (
    <>
      <AuthedLayout title="Сумма в товаре">
        <>
          {(() => {
            if (!sumInProduct) return <>Нет данных</>;
            return (
              <table className="table table-bordered table-striped w-auto">
                <thead>
                  <tr>
                    <th>Категория</th>
                    <th>Сумма в товаре</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Всего</th>
                    <th>{sumInProduct[1][0].total_sum}</th>
                  </tr>
                  {sumInProduct[0].map((obj) => (
                    <tr key={obj.category_name}>
                      <td>{obj.category_name}</td>
                      <td>{obj.sum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })()}
        </>
      </AuthedLayout>
    </>
  );
}
