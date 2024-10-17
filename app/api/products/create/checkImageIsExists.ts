import dbWorker from "@/db/dbWorker";

export default async function checkImageIsExists(imageName: string) {
  const res = await dbWorker(
    `select 1 from ${process.env.TABLE_PREFIX}_products_images where name = ?`,
    [imageName]
  )
    .then((x: any) => {
      return !!x.length;
    })
    .catch((err) => {
      console.log("err #asdj4", err.code);
      return false;
    });
  return res;
}
