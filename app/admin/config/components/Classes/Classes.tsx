import getClasses from "../utils/getClasses";
import Delete from "./components/delete/Delete";

export default async function Classes() {
  const classes = await getClasses();
  return (
    <>
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
            <tr>
              <td>{_class.id}</td>
              <td>{_class.className}</td>
              <td>{JSON.stringify(_class)}</td>
              <td>
                <Delete idClass={_class.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
