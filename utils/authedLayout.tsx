import CreateCategory from "./createCategory/createCategory";
import SideMenu from "./side-menu/SideMenu";

export default async function AuthedLayout(props: { children: any; title: string }) {
    return <>
        <div className="row flex-nowrap">
            <div className="col-2">
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
