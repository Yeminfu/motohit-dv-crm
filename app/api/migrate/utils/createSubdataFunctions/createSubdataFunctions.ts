import createPseudoCategories from "./createPseudoCategories";
import createPreudoAttributes from "./createPreudoAttributes";
import createPreudoProducts from "./createPreudoProducts";
import createPreudoAttributesValues from "./createPreudoAttributesValues";
import createPreudo_attr_prod_relation from "./createPreudo_attr_prod_relation";

export async function createSubdataFunctions() {
  await createPseudoCategories();
  await createPreudoAttributes();
  await createPreudoAttributesValues();
  await createPreudoProducts();
  await createPreudo_attr_prod_relation();
}
