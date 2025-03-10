import dbWorker from "#db/dbWorker2.ts";

export default async function DBSelectProcedures(idConfig: number): Promise<
  | {
    Name: string;
    Comment: string;
    "Create Procedure": string; //тело процедуры?
    Created: Date;
    Modified: Date;
    Definer: string;
  }[]
  | undefined
> {
  // return
  const proceduresListResponse = await dbWorker(
    "select name from chbfs_sys$procedures where idConfig = ?",
    // "show procedure status where DB = ?",
    [idConfig]
  );

  if (!proceduresListResponse.result) {
    return;
  }

  const proceduresWithDetails = await Promise.all(
    proceduresListResponse.result.map(
      async (procedureFromList: { name: string }) => {
        const procedureWithDEtails = await dbWorker(
          `show create procedure ${procedureFromList.name}`,
          []
        );
        if (!procedureWithDEtails.result) {
          console.error("#sdakas84. data.error = ", procedureWithDEtails.error);
          return;
        }
        return {
          ...procedureFromList,
          ...procedureWithDEtails.result[0],
        };
      }
    )
  );

  return proceduresWithDetails.filter((x) => x);
}
