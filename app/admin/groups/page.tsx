import AuthedLayout from "@/utils/authedLayout";
import getGroups from "./utils/getGroups";
import Users from "./components/users";

export default async function Page() {
  const groups = await getGroups();
  return <AuthedLayout title="Groups">
    {(() => {
      if (!groups) return <>err #kfsdf49mm9</>
      return <table className="table table-bordered table-striped w-auto">
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
            </td>
          </tr>)}
        </tbody>
      </table>
    })()}
  </AuthedLayout>
}
