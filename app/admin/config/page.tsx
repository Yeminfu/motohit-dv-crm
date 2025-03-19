import AuthedLayout from "@/utils/authedLayout";
import Tables from "./components/tables/tables";
import Keys from "./components/keys/keys";
import Classes from "./components/Classes/Classes";
import Procedures from "./components/procedures/procedures";
import ConfigThree from "./components/configThree/configThree";
import CreateConfig from "./components/createConfig/createConfig";
import ScalarFunctions from "./components/scalarFunctions/scalarFunctions";
import Views4classes from "./components/views4classes/views4classes";
import Contrains from "./components/contrains/contrains";
import Procedures2_0 from "./components/procedures2_0/procedures2_0";

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
              <h3>Процедуры 2.0</h3>
            </div>
            <div className="card-body">
              <Procedures2_0 />
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
              <h3>Представления (views)</h3>
            </div>
            <div className="card-body">
              <Views4classes />
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

          <div className="card">
            <div className="card-header">
              <h3>Ограничения</h3>
            </div>
            <div className="card-body">
              <Contrains />
            </div>
          </div>
        </>
      </AuthedLayout>
    </>
  );
}
