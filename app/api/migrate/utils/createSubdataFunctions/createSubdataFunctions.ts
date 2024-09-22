import getDataFromDB from "@/db/getDataFromDB";
import createPseudoCategories from "./createPseudoCategories";
import createAttribute from "@/db/crud/createAttribute";

export async function createSubdataFunctions() {
  await createPseudoCategories();
  await createPreudoAttributes();
}

async function createPreudoAttributes() {
  await createAttribute(
    'название', 1, 1, 1, 1
  )
}

