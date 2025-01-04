import Navbar from "./Navbar";
import SQLConsole from "./sqlConsole/sqlConsole";

export default function Layout(props: { children: any }) {
  return (
    <>
      <Navbar />
      <>
        <div className="card">
          <div className="card-header">
            <h3>Консоль</h3>
          </div>
          <div className="card-body">
            <SQLConsole />
          </div>
        </div>
        {props.children}
      </>
    </>
  );
}
