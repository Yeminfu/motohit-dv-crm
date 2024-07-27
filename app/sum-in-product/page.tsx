import AuthedLayout from "@/utils/authedLayout";
import getSumInProduct from "./getSumInProduct";

export default async function Page() {
    const sumInProduct = await getSumInProduct();

    const total = sumInProduct.map(x => x.sumInProducts).reduce((a, b) => b + b);

    return <>
        <AuthedLayout title="Сумма в товаре">
            <>
                <table className="table w-auto">
                    <thead>
                        <tr>
                            <th>Категория</th>
                            <th>Сумма в товаре</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sumInProduct.map(category => <tr key={category.categoryName}>
                            <td>{category.categoryName}</td>
                            <td>{category.sumInProducts}</td>
                        </tr>)}
                        <tr>
                            <th>Всего</th>
                            <td>{total}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        </AuthedLayout>
    </>
}
