import dbWorker from "#db/dbWorker2.ts";
import ts_procedure4Edit from "../types/ts_procedure4Edit";

export default async function getProcedure(
  procedureName: string
): Promise<ts_procedure4Edit | undefined> {
  const result = await dbWorker(
    `
      select
        id,
        name,
        SQLString,
        title,
        idConfig
      from chbfs_sys$procedures
      where
        name = '${procedureName}'
    `,
    []
  );

  if (result.error) {
    console.error("err #ksdf84", result.error);
    return;
  }

  if (!result.result) {
    console.error("err #di83h", result.error);
    return;
  }

  const procedure = result.result[0];

  if (!procedure) {
    console.error("err #o83hndsm");
    return;
  }

  return procedure;
}
