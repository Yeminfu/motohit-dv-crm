import dbConnection from "@/db/connect";


const { TABLE_PREFIX } = process.env;

export default async function createTokensTable() {
    const connection = await dbConnection();
  
    await connection.query("SET FOREIGN_KEY_CHECKS=1");
    await connection.query(`drop table if exists ${TABLE_PREFIX}_tokens`);
    await connection
      .query(
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
      `
      )
      .then(([x]: any) => {
        console.log("createTokensTable", x.serverStatus);
      })
      .catch((z) => {
        console.log("createUsersTable", z);
      });
    await connection.query("SET FOREIGN_KEY_CHECKS=0");
    await connection.end();
  }