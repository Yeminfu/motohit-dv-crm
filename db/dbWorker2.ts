import dbConnection from "./connect";

export default async function dbWorker(
  sqlSQ: string,
  parameters: any
): Promise<
  | {
      result: any;
    }
  | {
      error: { code: string };
    }
> {
  const connection = await dbConnection();
  try {
    const sql = await connection.query(sqlSQ, parameters);
    await connection.end();
    return {
      result: sql[0],
    };
  } catch (error: any) {
    await connection.end();
    if (error.code)
      return {
        error: {
          code: error.code,
        },
      };
  }
  return {
    error: {
      code: "unknown",
    },
  };
}
