import dbConnection from "@/db/connect";

export default async function checkImageIsExists(imageName: string) {
  const connection = await dbConnection();
  const res = await connection
    .query(
      `select 1 from ${process.env.TABLE_PREFIX}_products_images where name = ?`,
      [imageName]
    )
    .then(([x]: any) => {
      return !!x.length;
    })
    .catch((err) => {
      console.log("err #asdj4", err.code);
      return false;
    });
  await connection.end();

  return res;
}
