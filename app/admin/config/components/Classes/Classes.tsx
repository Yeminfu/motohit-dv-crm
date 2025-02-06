import Link from "next/link";
import getClasses from "../utils/getClasses";
import CreateClassButton from "./components/create/createClassButton";
import Delete from "./components/delete/Delete";

export default async function Classes() {
  const classes = await getClasses();
  return (
    <>
      <CreateClassButton />
      <table className="table table-bordered w-auto">
        <thead>
          <tr>
            <th>id</th>
            <th>className</th>
            <th>json</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {classes.map((_class) => (
            <tr key={_class.id}>
              <td> {_class.id}</td>
              <td>
                <Link href={`/admin/classes/` + _class.id}>{_class.name}</Link>
              </td>
              <td>{JSON.stringify(_class)}</td>
              <td>
                <Delete name={_class.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
