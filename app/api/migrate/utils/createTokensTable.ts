import dbWorker from "@/db/dbWorker2";

const { TABLE_PREFIX } = process.env;

export default async function createTokensTable() {
  await dbWorker("SET FOREIGN_KEY_CHECKS=1", []);
  await dbWorker(`drop table if exists ${TABLE_PREFIX}_tokens`, []);
  await dbWorker(
    `
          CREATE TABLE ${TABLE_PREFIX}_tokens (
              id int primary key AUTO_INCREMENT,
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
              idUser int not null,
              token varchar(250) not null,
              confirmCode int not null,
              deadline DATETIME not null,
              foreign key (idUser) references ${TABLE_PREFIX}_users(id)
          );
      `,
    []
  )
    .then((x: any) => { })
    .catch((z) => {
      console.error("createUsersTable", z);
    });
  await dbWorker("SET FOREIGN_KEY_CHECKS=0", []);
}
