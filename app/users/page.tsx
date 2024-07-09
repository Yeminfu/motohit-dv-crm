import AuthedLayout from "@/utils/authedLayout";
import getAllUsers from "./getAllUsers";

export default async function Page() {
    const users = await getAllUsers();
    return <>
        <AuthedLayout title={"Пользователи"}>
            <>
                <pre>{JSON.stringify(users, null, 2)}</pre>
            </>
        </AuthedLayout>
    </>
}
