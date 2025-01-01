import dbWorker from "#db/dbWorker2.ts";

export default async function DBSelectProcedures(): Promise<
  | {
      id: number;
      name: string;
      SQLString: string;
      title: string;
    }[]
  | undefined
> {
  const result = await dbWorker("show procedure status where DB = ?", [
    process.env.DB_NAME,
  ]);

  return result.result;
}
