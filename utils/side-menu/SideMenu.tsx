import Link from "next/link";
import CreateCategory from "../createCategory/createCategory";
import getAllCategories from "../getAllCategories";

export default async function SideMenu() {
    const categories = await getAllCategories();
    return <>
        <div className="mb-2">
            <Link className="btn btn-dark d-block text-start mb-1" href={`/`}>Главная</Link>
        </div>
        <h4>Категории</h4>
        {categories.map((x) => <div key={x.id} >
            <Link className="btn btn-dark d-block text-start mb-1" href={`/category/${x.id}`}>{x.name}</Link>
        </div>)}
        <CreateCategory />
        <div className="mt-4">
            <Link className="btn btn-dark d-block text-start mb-1" href={`/users`}>Пользователи</Link>
        </div>
        <div className="mt-4">
            <Link className="btn btn-dark d-block text-start mb-1" href={`/sum-in-product`}>Сумма в товаре</Link>
        </div>
    </>
}

