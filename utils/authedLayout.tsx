// import Link from "next/link";
// import CreateCategory from "./createCategory/createCategory";
import SideMenu from "./side-menu/SideMenu";

export default async function AuthedLayout(props: { children: any; title: string }) {
    return <>
        <div className="d-flex flex-nowrap" style={{ minHeight: "100vh" }}>
            <div className="col-2 p-2 " style={{ background: '#eee', minWidth: "245px" }}>
                <SideMenu />
                
            </div>
            <div className="col p-2">
                <h1>{props.title}</h1>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    </>
}
