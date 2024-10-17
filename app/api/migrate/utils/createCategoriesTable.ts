import dbWorker from "@/db/dbWorker";

const { TABLE_PREFIX } = process.env;

export default async function createCategoriesTable() {
  await dbWorker("SET FOREIGN_KEY_CHECKS=0", []);
  await dbWorker(`drop table if exists ${TABLE_PREFIX}_categories`, []);
  await dbWorker(
    `
          CREATE TABLE ${TABLE_PREFIX}_categories (
              id int primary key AUTO_INCREMENT,
              category_name varchar(250) not null unique,
              created_date datetime default CURRENT_TIMESTAMP,
              slug varchar(250) not null unique,
              created_by int not null,
              is_active TINYINT(1) default 1,
              idParent int,
              description longtext,
              position int,
              foreign key (idParent) references ${TABLE_PREFIX}_categories(id),
              foreign key (created_by) references ${TABLE_PREFIX}_users(id)
          );
      `, []
  )
    .then(([x]: any) => {
      // console.log(`${TABLE_PREFIX}_categories`, x);
    })
    .catch((z) => {
      console.log("err #f8vck", z);
    });
  await dbWorker("SET FOREIGN_KEY_CHECKS=1", []);
}
