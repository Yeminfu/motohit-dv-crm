import dbConnection from "@/db/connect";
import AuthedLayout from "@/utils/authedLayout";

export default async function Page() {
    const history = await getHistory();
    return <>
        <AuthedLayout title="История">
            <>
                <pre>{JSON.stringify(history, null, 2)}</pre>
            </>
        </AuthedLayout>
    </>
}

async function getHistory() {
    const connection = await dbConnection();
    const res = await connection.query(`select * from ${process.env.TABLE_PREFIX}_history`).then(([x]) => x);
    await connection.end();
    return res
}