"use client"

import { useState } from "react";
import confirmMatchClient from "./confirmMatchClient";
import declineMatchClient from "./declineMatchClient";
import ts_productMatch from "./ts_productMatch";

export default function Client(props: { matches: ts_productMatch[] }) {
  const [loading, setLoading] = useState(false);

  const [ids, setIds] = useState<number[]>([]);

  return <>
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Товар из магазина</th>
          <th>Совпадения (товары из старой crm)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.matches.map((product, i) => {
          if (ids.includes(product.idProductFromMapping)) return null;
          return <tr key={product.idProductFromMapping}>
            <td>{i}</td>
            <td>{product.nameFromShop}</td>
            <td>{product.nameFromOldCrm}</td>
            <td style={{ width: 200 }}>
              {loading ?
                <>Загрузка...</>
                : <div className="d-flex">
                  <button className="btn btn-success me-2" onClick={async () => {
                    setLoading(true);
                    await confirmMatchClient(product.idProductFromMapping);
                    setLoading(false);
                    setIds([
                      ...ids,
                      product.idProductFromMapping
                    ]);
                  }}>Подтвердить</button>
                  <button className="btn btn-danger" onClick={async () => {
                    setLoading(true)
                    await declineMatchClient(product.idProductFromMapping);
                    setLoading(false);
                    setIds([
                      ...ids,
                      product.idProductFromMapping
                    ]);
                  }}>Отмена</button>
                </div>}
            </td>
          </tr>
        })}
      </tbody>
    </table>
  </>
}

function ProductButtonsSwitcher() {

}