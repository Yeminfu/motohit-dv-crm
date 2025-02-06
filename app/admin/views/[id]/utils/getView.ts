import dbWorker from "#db/dbWorker2.ts";
import ts_view4edit from "../../types/ts_view4edit";

export default async function getView(
  viewName: string
): Promise<ts_view4edit | undefined> {
  const result = await dbWorker(
    `
      select
        id,
        created_date,
        name,
        title,
        SQLString,
        description,
        idClass
      from chbfs_sys$views
      where
        name = '${viewName}'
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
    console.error("err #o83hnm");
    return;
  }

  return procedure;
}
