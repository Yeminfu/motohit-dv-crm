import AppendUserForm from "../appendUserForm/appendUserForm";
import getUsers from "./utils/getUsers"

export default async function Users(props: {
  idGroup: number
}) {
  const users = await getUsers(props.idGroup);
  if (!users) return <>error #ksdf95</>
  return <>
    <table className="table">
      <tbody>
        {users.map(u => <tr key={u.id}>
          <td>{u.id}</td>
          <td>{u.name}</td>
          <td><AppendUserForm idGroup={props.idGroup} /></td>
        </tr>)}
      </tbody>
    </table>

  </>
}
