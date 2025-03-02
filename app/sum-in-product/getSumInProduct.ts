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
      replace(
          format(
              sum(p.purchase_price),
              0
          ),
          ',',
          ' '
      ) AS total_sum
    from chbfs_products p;
  `;
  const res = await dbWorker(sql, []);
  if (res.result) {
    return res.result;
  }

  console.log('error #$kfsdf04', res);

}
