import dbWorker from "#db/dbWorker2.ts";
import ts_scalarFunction4Edit from "../types/ts_scalarFunction4Edit";

export default async function getScalarFunction(
  scalarFunctionName: string
): Promise<ts_scalarFunction4Edit | undefined> {
  console.log({ scalarFunctionName });

  const result = await dbWorker(
    `
      select
        id,
        name,
        SQLString,
        title,
        description,
        idConfig
      from chbfs_sys$scalarFunctions
      where
        name = '${scalarFunctionName}'
    `,
    []
  );
  if (result.error) {
    console.error("err #snd3s", result.error);
    return;
  }
  if (!result.result) {
    console.error("err #kkk3h8", result.error);
    return;
  }
  const scalarFunction = result.result[0];
  if (!scalarFunction) {
    console.error("err #askd392");
    return;
  }
  return scalarFunction;
}
