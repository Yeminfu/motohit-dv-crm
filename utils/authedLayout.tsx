import CreateCategory from "./createCategory/createCategory";
import SideMenu from "./side-menu/SideMenu";

export default async function AuthedLayout(props: { children: any; title: string }) {
    return <>
        <div className="row flex-nowrap" style={{ minHeight: "100vh" }}>
            <div className="col-2 p-2 bg-secondary">
                <SideMenu />
                <CreateCategory />
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
