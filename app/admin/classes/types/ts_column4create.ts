export default interface ts_column4create {
  className: string;
  column: {
    COLUMN_NAME: string;
    DATA_TYPE: "varchar" | "int" | "text";
    CHARACTER_MAXIMUM_LENGTH: string;
    IS_NULLABLE: string;
    COLUMN_DEFAULT: string;
  };
}
