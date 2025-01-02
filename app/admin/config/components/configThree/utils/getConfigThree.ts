import ts_configWithChildren from "../types/ts_configWithChildren";
import getChildrenRecursive from "./getChildrenRecursive";
import getParentConfigs from "./getParentConfigs";

export default async function getConfigThree(): Promise<
  ts_configWithChildren[]
> {
  const parentConfigs = await getParentConfigs();

  return await Promise.all(
    parentConfigs.map(async (parentConfig) => {
      const childrsn = await getChildrenRecursive(parentConfig.id);
      return {
        ...parentConfig,
        children: childrsn,
      };
    })
  );
}
