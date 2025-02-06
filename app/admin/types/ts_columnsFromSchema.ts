export default interface ts_columnsFromSchema {
  COLUMN_NAME: string;
  DATA_TYPE: string;
  CHARACTER_MAXIMUM_LENGTH: number | null;
  IS_NULLABLE: "YES" | "NO";
  COLUMN_KEY: null | "PRI" | "MUL";
  COLUMN_DEFAULT: null | string;
}
