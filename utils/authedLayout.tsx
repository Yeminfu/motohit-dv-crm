import SideMenu from "./side-menu/SideMenu";

export default async function AuthedLayout(props: {
  children: any;
  title: string;
}) {
  return (
    <>
      <div className="d-flex flex-nowrap" style={{ minHeight: "100vh" }}>
        <div
          className="col-2 p-2 "
          style={{ background: "#eee", minWidth: "245px" }}
        >
          <SideMenu />
        </div>
        <div className="col p-2">
          <div className="card">
            <div className="card-header">
              <h1 className="m-0 p-0">{props.title}</h1>
            </div>
            <div className="card-body">
              <div>{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
