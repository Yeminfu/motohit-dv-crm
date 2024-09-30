import createPseudoCategories from "./createPseudoCategories";
import createPreudoAttributes from "./createPreudoAttributes";
import createPreudoProducts from "./createPreudoProducts";

export async function createSubdataFunctions() {
  await createPseudoCategories();
  await createPreudoAttributes();
  await createPreudoProducts();
}
