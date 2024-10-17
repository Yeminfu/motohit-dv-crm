import dbWorker from "@/db/dbWorker";

export default async function getProductColumnsFullData(): Promise<{ [k: string]: string; }> {
    const res = await dbWorker(`SHOW FULL COLUMNS FROM motohit_dv_crm.chbfs_products;`, []);

    const obj: [string, string][] = res.map((x: {
        Comment: string; Field: string;
    }) => ([
        x.Field, x.Comment
    ]));

    const val = Object.fromEntries(obj);

    return val;
}
