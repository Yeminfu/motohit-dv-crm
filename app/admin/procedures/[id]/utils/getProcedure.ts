import dbWorker from "#db/dbWorker2.ts";

export default async function getProcedure(procedureName: string): Promise<
  | {
      Procedure: string;
      "Create Procedure": string;
      title: string;
    }
  | undefined
> {
  const result = await dbWorker(`show create procedure ${procedureName}`, []);

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
