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
      c.category_name as category_name,
      replace(
        format(
          sum(p.purchase_price),
          0
        ),
        ',',
        ' '
      ) as sum
    from chbfs_categories c
    inner join chbfs_products p on p.idCategory = c.id
    group by c.id
    order by sum(p.purchase_price) desc;

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
