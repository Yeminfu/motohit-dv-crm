import getDataFromDB from "@/db/getDataFromDB"
import { ts_categoriesWithIerarchy } from "@/types/categories/ts_categoriesWithIerarchy";

export default async function getCategoriesWithIerarchy(): Promise<ts_categoriesWithIerarchy[]> {

  const parentsSql = `select
    *
  from ${process.env.TABLE_PREFIX}_categories
  where
    idParent is null;`;

  //@ts-ignore
  const parents: ts_categoriesWithIerarchy[] = await getDataFromDB(parentsSql)

  const build = await Promise.all(
    parents.map(async parent => {
      const children = await getChildren(parent.id)
      return {
        ...parent,
        children
      }
    })
  );
  return build;
}

async function getChildren(idParent: number): Promise<ts_categoriesWithIerarchy[]> {
  const childrenSql = `
  select
    *
  from ${process.env.TABLE_PREFIX}_categories
  where
    idParent = ?
`;
  const children: ts_categoriesWithIerarchy[] = await getDataFromDB(childrenSql, [idParent]);

  const build = await Promise.all(
    children.map(async category => {
      const children = await getChildren(category.id)
      return {
        ...category,
        children
      }
    })
  );

  return build;
}