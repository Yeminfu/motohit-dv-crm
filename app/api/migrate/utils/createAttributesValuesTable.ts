import dbWorker from "@/db/dbWorker";

const { TABLE_PREFIX } = process.env;

export default async function createAttributesValuesTable() {
  await dbWorker(
    `
      CREATE TABLE ${TABLE_PREFIX}_attributes_values (
        id int primary key AUTO_INCREMENT,
        value_name varchar(250) not null,
        created_date datetime default CURRENT_TIMESTAMP,
        created_by int not null,
        idAttribute int not null,
        foreign key (idAttribute) references ${TABLE_PREFIX}_attributes(id),
        foreign key (created_by) references ${TABLE_PREFIX}_users(id)
      );
    `,
    []
  )
    .then((x: any) => {})
    .catch((z) => {
      console.error("err #вsslл", z);
    });
}
