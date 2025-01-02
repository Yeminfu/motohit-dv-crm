import dbWorker from "#db/dbWorker.ts";
import ts_keyFromDB from "../types/ts_keyFromDB";

export default async function getDBKeys(): Promise<ts_keyFromDB[]> {
  return dbWorker(
    `
      select
        TABLE_NAME,
        COLUMN_NAME,
        CONSTRAINT_NAME,
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME
        --  
      from information_schema.KEY_COLUMN_USAGE 
      where
        TABLE_SCHEMA = 'motohit_dv_crm'
        and COLUMN_NAME like 'id%'
        and COLUMN_NAME <> 'id';
    `,
    []
  );

  /*
    "CONSTRAINT_CATALOG": "def",
    "CONSTRAINT_SCHEMA": "motohit_dv_crm",
    "CONSTRAINT_NAME": "chbfs_attr_prod_relation_ibfk_1",
    "TABLE_CATALOG": "def",
    "TABLE_SCHEMA": "motohit_dv_crm",
    "TABLE_NAME": "chbfs_attr_prod_relation",
    "COLUMN_NAME": "idAttributeValue",
    "ORDINAL_POSITION": 1,
    "POSITION_IN_UNIQUE_CONSTRAINT": 1,
    "REFERENCED_TABLE_SCHEMA": "motohit_dv_crm",
    "REFERENCED_TABLE_NAME": "chbfs_attributes_values",
    "REFERENCED_COLUMN_NAME": "id"
  */
}
