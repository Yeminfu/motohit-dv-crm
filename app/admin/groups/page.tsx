import AuthedLayout from "@/utils/authedLayout";
import getGroups from "./utils/getGroups";
import Users from "./components/users/users";
import CreateGroupForm from "./components/createGroupForm/createGroupForm";
import AppendUserForm from "./components/appendUserForm/appendUserForm";
import checkUserIsInGroup from "@/utils/users/checkUserIsInGroup";
import { cookies } from "next/headers";
import getUserByToken from "@/utils/users/getUserByToken";

export default async function Page() {

  const authToken = String(cookies().get("auth")?.value);
  const user = await getUserByToken(authToken);

  if (!user) return <>error #asdasd94-</>

  const groups = await getGroups();

  return <AuthedLayout title="Groups">
    {(() => {
      if (!groups) return <>err #kfsdf49mm9</>
      return <>
        <table className="table table-bordered table-striped w-auto">
          <thead>
            <tr>
              <td>id</td>
              <td>группа</td>
              <td>пользователи</td>
            </tr>
          </thead>
          <tbody>
            {groups.map(g => <tr key={g.id}>
              <td>{g.id}</td>
              <td>{g.name}</td>
              <td>
                <Users idGroup={g.id} />
                <AppendUserForm idGroup={g.id} />
              </td>
            </tr>)}
          </tbody>
        </table>
        {(async () => {
          const isInGroup = await checkUserIsInGroup(user.id, 'su');
          if (isInGroup) return <CreateGroupForm />
        })()}
      </>
    })()}
  </AuthedLayout>
}
