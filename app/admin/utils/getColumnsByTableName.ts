import dbWorker from "#db/dbWorker.ts";

export default async function getColumnsByTableName(tableName: string): Promise<
  {
    COLUMN_NAME: string;
    DATA_TYPE: string;
    CHARACTER_MAXIMUM_LENGTH: number | null;
    IS_NULLABLE: "YES" | "NO";
    COLUMN_KEY: null | "PRI" | "MUL";
    COLUMN_DEFAULT: null | string;
  }[]
> {
  return dbWorker(
    `
      select
        *
      from information_schema.columns
      where
        table_name = ?
    `,
    [tableName]
  );
}
