import ts_configFromDb from "./ts_configFromDb";

type ts_configWithChildren = ts_configFromDb & {
  children: ts_configWithChildren[];
};

export default ts_configWithChildren;
