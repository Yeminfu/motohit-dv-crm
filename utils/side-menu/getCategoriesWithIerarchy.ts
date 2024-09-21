import getDataFromDB from "@/db/getDataFromDB"
import { ts_categoriesWithIerarchy } from "@/types/categories/ts_categoriesWithIerarchy";

export default async function getCategoriesWithIerarchy() {
  console.log('getCategoriesWithIerarchygetCategoriesWithIerarchy');

  const parentsSql = `select
    *
  from ${process.env.TABLE_PREFIX}_categories
  where
    idParent is null;`;

  //@ts-ignore
  const parents: ts_categoriesWithIerarchy[] = await getDataFromDB(parentsSql)

  const build = await recursiveBuild(parents);
  console.log('build', build);

}

async function recursiveBuild(parents: ts_categoriesWithIerarchy[]) {
  const parentsWithCHildren = await Promise.all(
    parents.map(async category => {
      const childrenSql = ``;
      const children: ts_categoriesWithIerarchy[] = await getDataFromDB(childrenSql, [category.id])
      return {
        ...category
      };
    })
  )
}