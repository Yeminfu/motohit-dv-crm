import dbConnection from "./connect";

export default async function getDataFromDB(sqlSQ: string, parameters: any): Promise<any> {
    const connection = await dbConnection();
    const sql = await connection.query(sqlSQ, parameters);
    await connection.end();
    return sql[0];
}