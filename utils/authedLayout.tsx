import Link from "next/link";
import CreateCategory from "./createCategory/createCategory";
import SideMenu from "./side-menu/SideMenu";

export default async function AuthedLayout(props: { children: any; title: string }) {
    return <>
        <div className="row flex-nowrap" style={{ minHeight: "100vh" }}>
            <div className="col-2 p-2 " style={{ background: '#eee' }}>
                <SideMenu />
                <CreateCategory />
                <div className="mt-4">
                    <Link className="btn btn-dark d-block text-start mb-1" href={`/users`}>Пользователи</Link>
                </div>
            </div>
            <div className="col">
                <h1>{props.title}</h1>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    </>
}
