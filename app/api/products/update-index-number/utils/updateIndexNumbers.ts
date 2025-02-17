import dbWorker from "@/db/dbWorker2";

export default async function updateIndexNumbers(
  idProduct: number,
  idNextProduct: number
) {
  const sql = `
    set @idProduct_A = ?;
    set @idProduct_B = ?;

    set @indexNumber_A = ( select indexNumber from chbfs_products where id = @idProduct_A );
    set @indexNumber_B = ( select indexNumber from chbfs_products where id = @idProduct_B );

    update chbfs_products set indexNumber = @indexNumber_A where id = @idProduct_B;
    update chbfs_products set indexNumber = @indexNumber_B where id = @idProduct_A;
  `;
  const res = await dbWorker(sql, [idProduct, idNextProduct]);
  return res;
}
