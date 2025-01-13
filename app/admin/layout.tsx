import Navbar from "./Navbar";
import DownloadSQLDump from "./components/downloadSQLDump/downloadSQLDump";
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
              <div className="flex-grow-1">
                <SQLConsole />
              </div>
              <div>
                <DownloadSQLDump />
              </div>
            </div>
          </div>
        </div>
        {props.children}
      </>
    </>
  );
}
