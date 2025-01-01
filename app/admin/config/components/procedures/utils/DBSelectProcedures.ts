import dbWorker from "#db/dbWorker2.ts";

export default async function DBSelectProcedures(): Promise<
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
  const proceduresListResponse = await dbWorker(
    "show procedure status where DB = ?",
    [process.env.DB_NAME]
  );

  if (!proceduresListResponse.result) {
    return;
  }

  const proceduresWithDetails = await Promise.all(
    proceduresListResponse.result.map(
      async (procedureFromList: { Name: String }) => {
        const procedureWithDEtails = await dbWorker(
          `show create procedure ${procedureFromList.Name}`,
          []
        );
        if (!procedureWithDEtails.result) {
          console.error("#dkm3m. data.error = ", procedureWithDEtails.error);
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
