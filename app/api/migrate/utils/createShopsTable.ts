import dbWorker from "@/db/dbWorker";

const { TABLE_PREFIX } = process.env;

export default async function createShopsTable() {
  await dbWorker("SET FOREIGN_KEY_CHECKS=0", []);
  await dbWorker(`drop table if exists ${TABLE_PREFIX}_shops`, []);
  await dbWorker(
    `
          CREATE TABLE ${TABLE_PREFIX}_shops (
              id int primary key AUTO_INCREMENT,
              shopName varchar(250) not null,
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `, []
  )
    .then(([x]: any) => {
      console.log("createShopsTable", x.serverStatus);
    })
    .catch((z) => {
      console.log("createUsersTable", z);
    });
  await dbWorker(
    `insert into ${TABLE_PREFIX}_shops (shopName) values ('Биробиджан'), ('Хабаровск'), ('Благовещенск')`, []
  );
  await dbWorker("SET FOREIGN_KEY_CHECKS=1", []);
}
