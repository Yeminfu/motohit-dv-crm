import Link from "next/link"
import getAllAttributes from "./getAllAttributes"

export default async function Attributes() {
    const attributes = await getAllAttributes()
    return <>
        <div className="list-group">
            <div className="list-group-item list-group-item-action list-group-item-dark active">Выберите категорию</div>
            <div className="list-group-item list-group-item-action">
            </div>
            {attributes.map(attribute => <Link href={`/attributes/get/${attribute.id}`} className="list-group-item list-group-item-action">
                <>
                    {attribute.attribute_name}
                </>
            </Link>)}
        </div>
    </>
}
