import dbWorker from "#db/dbWorker2.ts";
import ts_configFromDb from "../types/ts_configFromDb";

export default async function getParentConfigs(): Promise<ts_configFromDb[]> {
  const res = await dbWorker(
    `
      select * from chbfs_sys$config where idParent is null
    `,
    []
  );
  if (res.error) {
    console.error("err #fkd93m");
    return [];
  }
  return res.result;
}
