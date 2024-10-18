import { AttributeType } from "../categories/attributes";
import ts_attributeValue from "./ts_attributeValue";

type tsAttributeWithValues = AttributeType & { values: ts_attributeValue[] };
export default tsAttributeWithValues;