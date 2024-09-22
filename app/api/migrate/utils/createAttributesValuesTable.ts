import dbConnection from "@/db/connect";

const { TABLE_PREFIX } = process.env;

export default async function createAttributesValuesTable() {
    const connection = await dbConnection();
    await connection.query("SET FOREIGN_KEY_CHECKS=0");
    await connection.query(`drop table if exists ${TABLE_PREFIX}_attributes_values`);

    await connection
        .query(
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
        `
        )
        .then(([x]: any) => {
            // console.log(`${TABLE_PREFIX}_categories`, x);
        })
        .catch((z) => {
            console.log("err #вsslл", z);
        });
    await connection.query("SET FOREIGN_KEY_CHECKS=1");
    await connection.end();
}
