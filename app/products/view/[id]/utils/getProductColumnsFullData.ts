import dbWorker from "@/db/dbWorker2";

export default async function getProductColumnsFullData(): Promise<{ [k: string]: string; }> {
    const res = await dbWorker(`SHOW FULL COLUMNS FROM motohit_dv_crm.chbfs_products;`, []).then(x => x.result);

    const obj: [string, string][] = res.map((x: {
        Comment: string; Field: string;
    }) => ([
        x.Field, x.Comment
    ]));

    const val = Object.fromEntries(obj);

    return val;
}
