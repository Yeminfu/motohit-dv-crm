import AuthedLayout from "@/utils/authedLayout";
import getAllUsers from "./getAllUsers";
import CreateUserForm from "./createUserForm";
import getShops from "../category/[id]/getShops";

export default async function Page() {
    const users = await getAllUsers();
    const shops = await getShops()
    return <>
        <AuthedLayout title={"Пользователи"}>
            <>
                <pre>{JSON.stringify(users, null, 2)}</pre>
                <CreateUserForm shops={shops}/>
            </>
        </AuthedLayout>
    </>
}
