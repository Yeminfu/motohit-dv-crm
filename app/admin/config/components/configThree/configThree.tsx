import RecursiveView from "./components/recursiveView/recursiveView";
import getConfigThree from "./utils/getConfigThree";

export default async function ConfigThree() {
  const configThree = await getConfigThree();
  return (
    <>
      <div className="list-group">
        {configThree.map((config) => (
          <RecursiveView config={config} key={config.id} />
        ))}
      </div>
    </>
  );
}
