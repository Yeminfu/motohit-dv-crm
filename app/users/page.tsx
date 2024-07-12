import AuthedLayout from "@/utils/authedLayout";
import getAllUsers from "./getAllUsers";
import CreateUserForm from "./createUserForm";
import getShops from "../../utils/getShops";

export default async function Page() {
    const users = await getAllUsers();
    const shops = await getShops()
    return <>
        <AuthedLayout title={"Пользователи"}>
            <>
                <table className="table w-auto">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Имя</th>
                            <th>Телеграм</th>
                            <th>Регистрация подтверждена</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => <tr key={user.id}>
                            <td>{user.id - 1}</td>
                            <td>{user.name}</td>
                            <td>{user.telegram_username}</td>
                            <td>{user.tg_chat_id ? 'да' : 'нет'}</td>
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
