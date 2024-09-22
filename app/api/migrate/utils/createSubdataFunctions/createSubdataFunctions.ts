import getDataFromDB from "@/db/getDataFromDB";

export async function createSubdataFunctions() {
    // создать категории товаров

    const category = 
    await getDataFromDB(`select 145
      `, []).then(x => {
        console.log('xxxxx', x);

    })
    // if (process.env.CAN_MIGRATE !== "poopaloopa") return;
    // await createTables()
}
