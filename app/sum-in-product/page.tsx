import AuthedLayout from "@/utils/authedLayout";
import getAllCategories from "@/utils/getAllCategories";
import dbConnection from "@/db/connect";

export default async function Page() {
    const sumInProduct = await getSumInProduct();
    return <>
        <AuthedLayout title="Сумма в товаре">
            <>
                asdasd
                <pre>{JSON.stringify(sumInProduct, null, 2)}</pre>
            </>
        </AuthedLayout>
    </>
}

async function getSumInProduct() {
    const sumInProduct: any = [];
    const categories = await getAllCategories();
    for (let index = 0; index < categories.length; index++) {
        const category = categories[index];
        console.log(category);
        const products = await getProductsByCategoryId(category.id);
        console.log('products', products);

        // const products = 
    }
    return sumInProduct;
}

async function getProductsByCategoryId(idCategory: number) {
    const connection = await dbConnection();
    const products = await connection.query(`
        select
            *
        from ${process.env.TABLE_PREFIX}_products
        where
            idCategory = ?
    `, [
        idCategory
    ]).then(([x]) => x);

    // console.log('products', products);
    await connection.end();
    return products;
}