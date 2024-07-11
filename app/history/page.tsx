import dbConnection from "@/db/connect";
import AuthedLayout from "@/utils/authedLayout";
import dayjs from "dayjs";

export default async function Page() {
    const history = await getHistory();
    return <>
        <AuthedLayout title="История">
            <>
                <table className="table table-bordered table-striped">
                    <tbody>
                        {history.map(historyRow => <tr key={historyRow.id}>
                            <td>{historyRow.id}</td>
                            <td>{dayjs(historyRow.created_date).toString()}</td>
                            <td><pre>{JSON.stringify(historyRow.data, null, 2)}</pre></td>
                            <td>{historyRow.doneBy}  </td>
                        </tr>)}
                    </tbody>
                </table>
                {/* <pre>{JSON.stringify(history, null, 2)}</pre> */}
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