import createPseudoCategories from "./createPseudoCategories";
import createPreudoAttributes from "./createPreudoAttributes";
import createPreudoProducts from "./createPreudoProducts";
import createPreudoAttributesValues from "./createPreudoAttributesValues";

export async function createSubdataFunctions() {
  await createPseudoCategories();
  await createPreudoAttributes();
  await createPreudoAttributesValues();
  await createPreudoProducts();
}
