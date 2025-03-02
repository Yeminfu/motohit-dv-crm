import dbWorker from "@/db/dbWorker2";

const { TABLE_PREFIX } = process.env;

export default async function createAttributesTable() {
  await dbWorker(
    `
      CREATE TABLE ${TABLE_PREFIX}_attributes (
        id int primary key AUTO_INCREMENT,
        attribute_name varchar(250) not null,
        created_date datetime default CURRENT_TIMESTAMP,
        created_by int not null,
        view_in_filter TINYINT(1) default 1,
        isOpenInFilter TINYINT(1) default 1,
        idCategory int not null,
        is_main int not null,
        foreign key (idCategory) references ${TABLE_PREFIX}_categories(id),
        foreign key (created_by) references ${TABLE_PREFIX}_users(id)
      );
    `,
    []
  )
    .then((x: any) => { })
    .catch((z) => {
      console.error("err #в0ыл", z);
    });
  await dbWorker("SET FOREIGN_KEY_CHECKS=1", []);
}
