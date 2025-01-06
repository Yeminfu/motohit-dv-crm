import Create from "./components/create";
import getViews from "./utils/getViews";

export default async function Views4classes() {
  const views = await getViews();
  return (
    <>
      <Create />
      <pre>{JSON.stringify(views)}</pre>
    </>
  );
}
