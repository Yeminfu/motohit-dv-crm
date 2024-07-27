import dbConnection from "@/db/connect";

export default async function getProductTotalInStock(idProduct: number) {
    const connection = await dbConnection();

    const products = await connection
        .query(
            `select sum(count) as count from chbfs_stock where idProduct = ?`, [idProduct]
        )
        .then(([x]: any) => {
            return x.pop().count;
        });

    await connection.end();
    return products;
}