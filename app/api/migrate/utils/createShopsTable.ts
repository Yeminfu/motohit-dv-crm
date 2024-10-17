import dbWorker from "@/db/dbWorker";

const { TABLE_PREFIX } = process.env;

export default async function createShopsTable() {
  await dbWorker(
    `
      CREATE TABLE ${TABLE_PREFIX}_shops (
          id int primary key AUTO_INCREMENT,
          shopName varchar(250) not null,
          created_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `, []
  )
    .then((x: any) => {
      console.log("createShopsTable", x.serverStatus);
    })
    .catch((z) => {
      console.log("createUsersTable", z);
    });
  await dbWorker(
    `insert into ${TABLE_PREFIX}_shops (shopName) values ('Биробиджан'), ('Хабаровск'), ('Благовещенск')`, []
  );
}
