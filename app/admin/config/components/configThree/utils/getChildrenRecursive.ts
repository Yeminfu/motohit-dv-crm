import dbWorker from "#db/dbWorker2.ts";
import ts_configFromDb from "../types/ts_configFromDb";
import ts_configWithChildren from "../types/ts_configWithChildren";

export default async function getChildrenRecursive(
  idParent: number
): Promise<ts_configWithChildren[]> {
  const res = await dbWorker(
    `
      select * from chbfs_config where idParent = ?
    `,
    [idParent]
  );
  if (res.error) {
    console.error("err #dkas8");
    return [];
  }

  const configs: ts_configFromDb[] = res.result;

  return await Promise.all(
    configs.map(async (config) => ({
      ...config,
      children: await getChildrenRecursive(config.id),
    }))
  );
}
