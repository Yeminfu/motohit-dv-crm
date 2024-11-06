import { AttributeType } from "../categories/attributes";
import ts_attributeValue from "./ts_attributeValue";

type ts_AttributeWithValues = AttributeType & { values: ts_attributeValue[] };
export default ts_AttributeWithValues;
