import Link from "next/link"
import dbWorker from "@/db/dbWorker";
import { ts_categoryType } from "../categories/categoryType";

export default async function Attributes() {
  const attributes = await getCategories()
  return <>
    <div className="list-group">
      <div className="list-group-item list-group-item-action list-group-item-dark active">Выберите категорию</div>
      {attributes.map(attribute => <Link href={`/attributes/category/${attribute.id}`} className="list-group-item list-group-item-action">
        <>
          {attribute.category_name}
        </>
      </Link>)}
    </div>
  </>
}

async function getCategories(): Promise<ts_categoryType[]> {
  const qs = `
    select
      id,
      category_name 
    from ${process.env.TABLE_PREFIX}_categories categories
    where
      id not in (
        select
          distinct idParent
        from ${process.env.TABLE_PREFIX}_categories categoriesInner
        where
          idParent is not null
      )
  `;
  const categories: ts_categoryType[] = await dbWorker(qs, [])
    .then((x: any) => x);
  return categories;
}
