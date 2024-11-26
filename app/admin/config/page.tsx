import dbWorker from "#db/dbWorker.ts";
import AuthedLayout from "#utils/authedLayout.tsx";
import Link from "next/link";

export default async function Page() {
  const tables = await getDBTables();
  const keys = await getDBKeys();

  return (
    <>
      <AuthedLayout title="Конфигурация">
        <>
          <h3>Классы</h3>
          <table className="table table-bordered w-auto">
            <thead>
              <tr>
                <th>LINK</th>
                {Object.keys(tables[0]).map((key) => (
                  <th>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => {
                return (
                  <tr key={table.Tables_in_motohit_dv_crm}>
                    <td>
                      <Link
                        className=""
                        href={`/admin/tables/${table.Tables_in_motohit_dv_crm}`}
                      >
                        {table.Tables_in_motohit_dv_crm}
                      </Link>
                    </td>
                    {/* {Object.values(keys[0]).map((key) => (
                      <td>{key}</td>
                    ))} */}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h3>Ключи</h3>
          {/* <pre>{JSON.stringify(keys, null, 2)}</pre> */}
        </>
      </AuthedLayout>
    </>
  );
}

async function getDBTables(): Promise<{ Tables_in_motohit_dv_crm: string }[]> {
  return dbWorker(`show tables`, []);
}

async function getDBKeys(): Promise<
  {
    TABLE_NAME: string;
    COLUMN_NAME: string;
    CONSTRAINT_NAME: string;
    REFERENCED_TABLE_NAME: string;
    REFERENCED_COLUMN_NAME: string;
  }[]
> {
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
