// import AppendUserForm from "../appendUserForm/appendUserForm";
import DeleteUserFromGroup from "./components/deleteUserFromGroup";
import getUsers from "./utils/getUsers"

export default async function Users(props: {
  idGroup: number
}) {
  const users = await getUsers(props.idGroup);
  if (!users) return <>error #ksdf95</>
  return <>
    <table className="table table-bordered">
      <tbody>
        {users.map(u => <tr key={u.id}>
          <td>{u.id}</td>
          <td>{u.name}</td>
          <td>
            <DeleteUserFromGroup idUser={u.id} idGroup={props.idGroup} />
          </td>
        </tr>)}
      </tbody>
    </table>
    {/* <AppendUserForm idGroup={props.idGroup} /> */}
  </>
}
