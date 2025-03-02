import dbWorker from "@/db/dbWorker2";

export default async function createImageInDB(
  imageName: string,
  idProduct: number
) {
  const res = await dbWorker(
    `insert into ${process.env.TABLE_PREFIX}_products_images (name, idProduct) values (?, ?)`,
    [imageName, idProduct]
  )
    .then((x: any) => {
      return x;
    })
    .catch((err) => {
      console.error("err #dasd8", err.code);

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

  return res;
}
