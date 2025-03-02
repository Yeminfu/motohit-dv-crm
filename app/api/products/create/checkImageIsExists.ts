import dbWorker from "@/db/dbWorker2";

export default async function checkImageIsExists(imageName: string) {
  const res = await dbWorker(
    `select 1 from ${process.env.TABLE_PREFIX}_products_images where name = ?`,
    [imageName]
  ).then(x => x.result)
    .then((x: any) => {
      return !!x.length;
    })
    .catch((err) => {
      console.error("err #asdj4", err.code);
      return false;
    });
  return res;
}
