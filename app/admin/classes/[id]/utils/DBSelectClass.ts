import ts_classFromDB from "#app/admin/config/types/ts_classFromDB.js";
import dbWorker from "#db/dbWorker2.ts";

export default async function DBSelectClass(
  idClass: number
): Promise<ts_classFromDB | undefined> {
  const res = await dbWorker(
    `
      select
        id,
        name,
        title,
        description,
        idConfig
      from chbfs_sys$classes where id = ?
    `,
    [idClass]
  );

  if (!res) {
    console.error("err #kasd9");
    return;
  }

  //@ts-ignore
  if (res.error) {
    console.error("err #9dajsdn");
    return;
  }

  if (!res.result) {
    console.error("err #kd983");
    return;
  }

  if (!res.result.length) {
    console.error("err #as9d3j");
    return;
  }

  return res.result[0];
}
