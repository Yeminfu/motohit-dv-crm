import AuthedLayout from "#utils/authedLayout.tsx";
import Tables from "./components/tables/tables";
import Keys from "./components/keys/keys";
import Classes from "./components/Classes/Classes";
import Procedures from "./components/procedures/procedures";
import ConfigThree from "./components/configThree/configThree";
import CreateConfig from "./components/createConfig/createConfig";
import ScalarFunctions from "./components/scalarFunctions/scalarFunctions";

export default async function Page() {
  return (
    <>
      <AuthedLayout title="config">
        <>
          <div className="card">
            <div className="card-header">
              <h3>Дерево конфигурации</h3>
            </div>
            <div className="card-body">
              <ConfigThree />
              <CreateConfig />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Процедуры</h3>
            </div>
            <div className="card-body">
              <Procedures />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Скалярные функции</h3>
            </div>
            <div className="card-body">
              <ScalarFunctions />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Классы</h3>
            </div>
            <div className="card-body">
              <Classes />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Таблицы</h3>
            </div>
            <div className="card-body">
              <Tables />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Ключи</h3>
            </div>
            <div className="card-body">
              <Keys />
            </div>
          </div>
        </>
      </AuthedLayout>
    </>
  );
}
