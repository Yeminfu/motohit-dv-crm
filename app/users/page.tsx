import AuthedLayout from "@/utils/authedLayout";
import getAllUsers from "./getAllUsers";
import CreateUserForm from "./createUserForm";
import getShops from "../../utils/getShops";
import getUserByToken from "@/utils/users/getUserByToken";
import { cookies } from "next/headers";
import EditUser from "./components/editUser/editUser";

export default async function Page() {
  const users = await getAllUsers();
  const shops = await getShops();

  const authToken = String(cookies().get("auth")?.value);
  const cUser = await getUserByToken(authToken);

  if (!cUser) return <>error #ksdf930-</>

  return <>
    <AuthedLayout title={"Пользователи"}>
      <>
        <table className="table w-auto">
          <thead>
            <tr>
              <th>id</th>
              <th>Имя</th>
              <th>Телеграм</th>
              <th>Подтвержден</th>
              <th>Активен</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) =>
              <tr key={user.id}>
                <td>{user.id - 1}</td>
                <td>{user.name}</td>
                <td>{user.telegram_username}</td>
                <td>{user.tg_chat_id ? 'да' : 'нет'}</td>
                <td>{user.is_active ? 'да' : 'нет'}</td>
                <td>
                  {cUser.is_boss ? <EditUser user={user} /> : null}
                </td>
              </tr>)}
          </tbody>
        </table>
        <div className="mt-4">
          <CreateUserForm shops={shops} />
        </div>
      </>
    </AuthedLayout>
  </>
}
