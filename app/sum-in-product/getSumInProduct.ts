import dbWorker from "#db/dbWorker2.ts";

export default async function getSumInProduct(): Promise<(
  [
    (
      {
        category_name: string,
        sum: string
      }[]
    ),
    {
      total_sum: string
    }[]
  ]
) | undefined> {
  const sql = `

  select
    c.category_name,
    getSumInCategoryProducts(c.id) as sum
  from chbfs_categories c
  where 
    getSumInCategoryProducts(c.id) > 0
  order by getSumInCategoryProducts(c.id) desc;
  
  select
    sum(
      getSumInCategoryProducts(c.id)
    ) as total_sum
  from chbfs_categories c;
    
  `;
  const res = await dbWorker(sql, []);
  if (res.result) {
    return res.result;
  }

  console.log('error #$kfsdf04', res);

}
