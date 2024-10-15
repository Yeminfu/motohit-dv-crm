import dbConnection from "@/db/connect";

const { TABLE_PREFIX } = process.env;

export default async function createAttributesTable() {
    const connection = await dbConnection();
    await connection.query("SET FOREIGN_KEY_CHECKS=0");
    await connection.query(`drop table if exists ${TABLE_PREFIX}_attributes`);
    await connection
        .query(
            `
            CREATE TABLE ${TABLE_PREFIX}_attributes (
                id int primary key AUTO_INCREMENT,
                attribute_name varchar(250) not null,
                created_date datetime default CURRENT_TIMESTAMP,
                created_by int not null,
                view_in_filter TINYINT(1) default 1,
                open_in_filter TINYINT(1) default 1,
                idCategory int not null,
                is_main int not null,
                foreign key (idCategory) references ${TABLE_PREFIX}_categories(id),
                foreign key (created_by) references ${TABLE_PREFIX}_users(id)
            );
        `
        )
        .then(([x]: any) => {
            // console.log(`${TABLE_PREFIX}_categories`, x);
        })
        .catch((z) => {
            console.log("err #в0ыл", z);
        });
    await connection.query("SET FOREIGN_KEY_CHECKS=1");
    await connection.end();
}

