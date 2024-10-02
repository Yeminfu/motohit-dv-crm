import Link from "next/link"
import getAllCategories from "@/utils/getAllCategories"

export default async function Attributes() {
    const attributes = await getAllCategories()
    return <>
        <div className="list-group">
            <div className="list-group-item list-group-item-action list-group-item-dark active">Выберите категорию</div>
            {/* <div className="list-group-item list-group-item-action">
            </div> */}
            {attributes.map(attribute => <Link href={`/attributes/category/${attribute.id}`} className="list-group-item list-group-item-action">
                <>
                    {attribute.category_name}
                </>
            </Link>)}
        </div>
    </>
}
