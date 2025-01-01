import dbWorker from "#db/dbWorker2.ts";
import HiddeableBox from "./components/HiddeableBox";

export default async function ConfigThree() {
  const configThree = await getConfigThree();

  return (
    <>
      <div className="list-group">
        {configThree.result.map((x: any, i: number) => (
          <div className="list-group-item" key={i}>
            <HiddeableBox isRoot={true}>
              <>{JSON.stringify(x)}</>
            </HiddeableBox>
          </div>
        ))}
      </div>

      <pre>{JSON.stringify(configThree, null, 2)}</pre>
    </>
  );
}

async function getConfigThree() {
  return await dbWorker(`select * from chbfs_config`, []);
}
