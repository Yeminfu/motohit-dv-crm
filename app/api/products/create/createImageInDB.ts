import dbConnection from "@/db/connect";

export default async function createImageInDB(
  imageName: string,
  idProduct: number
) {
  const connection = await dbConnection();
  const res = await connection
    .query(
      `insert into ${process.env.TABLE_PREFIX}_products_images (name, idProduct) values (?, ?)`,
      [imageName, idProduct]
    )
    .then(([x]: any) => {
      return x;
    })
    .catch((err) => {
      console.log("err #dasd8", err.code);

      const errors: any = {
        ER_DUP_ENTRY: "Товар с таким названием уже создан",
      };

      const errorText = errors[err.code]
        ? errors[err.code]
        : "Что-то пошло не так #d93b3";

      return {
        success: false,
        error: errorText,
      };
    });
  await connection.end();

  return res;
}
