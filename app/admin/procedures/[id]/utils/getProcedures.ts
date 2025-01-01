import dbWorker from "#db/dbWorker2.ts";

export default async function getProcedures(idProcedure: number): Promise<
  | {
      id: number;
      name: string;
      SQLString: string;
      title: string;
    }
  | undefined
> {
  const sql = `
    select
      *
    from chbfs_sys$procedures
    where
      id = ?
  `;

  const result = await dbWorker(sql, [idProcedure]);

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
