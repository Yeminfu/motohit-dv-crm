import dbWorker from "#db/dbWorker2.ts";
import getViews from "./utils/getViews";

export default async function Views4classes() {
  const views = await getViews();
  return (
    <>
      Views4classes
      <pre>{JSON.stringify(views)}</pre>
    </>
  );
}
