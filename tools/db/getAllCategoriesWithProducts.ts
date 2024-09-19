// import { sendMessageToTg } from "@/src/app/api/bug_report/sendMessageToTg";
import { CategoryFromDBInterface } from "@/types/categories/categories";
import { db_connection } from "./connect";
// import { CategoryFromDBInterface } from "@/src/app/types/categories";

export default async function getAllCategoriesWithProducts(): Promise<CategoryFromDBInterface[]> {
    const dataFromdb: CategoryFromDBInterface[] = await new Promise(r => {
        db_connection.query(`SELECT * FROM categories WHERE id NOT IN (SELECT DISTINCT parent FROM categories WHERE parent IS NOT NULL)`, function (err: any, res: any) {
            if (err) {
                // sendMessageToTg(JSON.stringify({
                //     code: "#djdkiT8Ytg",
                //     err,
                //     values: {
                //     }
                // }, null, 2));
                console.log('#djdkiT8Ytg', err);

            }
            r(res);
        })
    });

    if (!Array.isArray(dataFromdb)) return [];

    if (dataFromdb) {
        return dataFromdb;
    } else {
        return [];
    }
}


