import dbWorker from "@/db/dbWorker2";

const { TABLE_PREFIX } = process.env;

export default async function createShopsTable() {
  await dbWorker(
    `
      CREATE TABLE ${TABLE_PREFIX}_shops (
          id int primary key AUTO_INCREMENT,
          shopName varchar(250) not null,
          created_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `,
    []
  )
    .then((x: any) => { })
    .catch((z) => {
      console.error("createUsersTable", z);
    });
  await dbWorker(
    `insert into ${TABLE_PREFIX}_shops (shopName) values ('Биробиджан'), ('Хабаровск'), ('Благовещенск')`,
    []
  );
}
