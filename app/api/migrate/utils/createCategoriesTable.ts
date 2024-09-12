import dbConnection from "@/db/connect";

const { TABLE_PREFIX } = process.env;

export default async function createCategoriesTable() {
  const connection = await dbConnection();
  await connection.query("SET FOREIGN_KEY_CHECKS=0");
  await connection.query(`drop table if exists ${TABLE_PREFIX}_categories`);
  await connection
    .query(
      `
          CREATE TABLE ${TABLE_PREFIX}_categories (
              id int primary key AUTO_INCREMENT,
              category_name varchar(250) not null unique,
              created_date datetime default CURRENT_TIMESTAMP,
              slug varchar(250) not null unique,
              created_by int not null,
              is_active TINYINT(1) default 1,
              parent int,
              description mediumtext not null,
              position int,
              foreign key (parent) references ${TABLE_PREFIX}_categories(id),
              foreign key (created_by) references ${TABLE_PREFIX}_users(id)
          );
      `
    )
    .then(([x]: any) => {
      // console.log(`${TABLE_PREFIX}_categories`, x);
    })
    .catch((z) => {
      console.log("err #f8vck", z);
    });
  await connection.query("SET FOREIGN_KEY_CHECKS=1");
  await connection.end();
}
