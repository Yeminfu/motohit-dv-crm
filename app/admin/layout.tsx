import Navbar from "./Navbar";
import SQLConsole from "./components/sqlConsole/sqlConsole";

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
            <div className="d-flex justify-content-between align-items-top">
              <div>
                <SQLConsole />
              </div>
              <button className="btn">asd</button>
            </div>
          </div>
        </div>
        {props.children}
      </>
    </>
  );
}
