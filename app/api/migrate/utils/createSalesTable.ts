import dbConnection from "@/db/connect";
const { TABLE_PREFIX } = process.env;

export default async function createSalesTable() {
    const connection = await dbConnection();
    await connection.query("SET FOREIGN_KEY_CHECKS=0");
    await connection.query(`drop table if exists ${TABLE_PREFIX}_sales`);
    await connection
      .query(
        `
          CREATE TABLE ${TABLE_PREFIX}_sales (
              id int primary key AUTO_INCREMENT,
              idProduct int not null,
              idShop int not null,
              createtByUserId int not null,
              count int not null,
              sum int not null,
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
              foreign key (idProduct) references ${TABLE_PREFIX}_products(id),
              foreign key (idShop) references ${TABLE_PREFIX}_shops(id),
              foreign key (createtByUserId) references ${TABLE_PREFIX}_users(id)
          );
      `
      )
      .then(([x]: any) => {
        console.log("createSalesTable", x.serverStatus);
      })
      .catch((z) => {
        console.log("createSalesTable", z);
      });
    await connection.query("SET FOREIGN_KEY_CHECKS=1");
    await connection.end();
  }