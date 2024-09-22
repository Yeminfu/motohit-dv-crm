import createPseudoCategories from "./createPseudoCategories";
import createPreudoAttributes from "./createPreudoAttributes";

export async function createSubdataFunctions() {
  await createPseudoCategories();
  await createPreudoAttributes();
}
