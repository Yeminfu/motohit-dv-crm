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

async function getHistory(): Promise<ts_historyInDB[]> {
    const connection = await dbConnection();
    const res = await connection.query(`select * from ${process.env.TABLE_PREFIX}_history`).then(([x]: any) => x);
    await connection.end();
    return res
}

interface ts_historyInDB {
    id: number
    created_date: string
    data: string
    action: string
    doneBy: number
}