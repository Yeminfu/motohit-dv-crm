import getClasses from "../utils/getClasses";

export default async function Classes() {
  const classes = await getClasses();
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>id</th>
            <th>className</th>
            <th>json</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((_class) => (
            <tr>
              <td>{_class.id}</td>
              <td>{_class.className}</td>
              <td>{JSON.stringify(_class)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
