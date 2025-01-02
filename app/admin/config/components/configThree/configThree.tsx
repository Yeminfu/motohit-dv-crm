import getConfigThree from "./utils/getConfigThree";

export default async function ConfigThree() {
  const configThree = await getConfigThree();
  return (
    <>
      <div className="list-group"></div>
      <pre>{JSON.stringify({ configThree }, null, 2)}</pre>
    </>
  );
}
