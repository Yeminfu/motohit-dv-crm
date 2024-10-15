"use client"

import ts_productMatch from "./ts_productMatch"

export default function Client(props: { matches: ts_productMatch[] }) {
  return <>
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Товар из магазина</th>
          <th>Совпадения (товары из старой crm)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.matches.map(product => <tr key={product.idProductFromMapping}>
          <td>{product.nameFromShop}</td>
          <td>{product.nameFromOldCrm}</td>
          <td>
            <div className="d-flex">
              <button className="btn btn-success me-2">Подтвердить</button>
              <button className="btn btn-danger">Отмена</button>
            </div>
          </td>
        </tr>)}
      </tbody>
    </table>
  </>
}