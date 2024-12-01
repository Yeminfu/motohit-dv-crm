import { ReactElement } from "react";

export default function Card(props: { title: string; children: ReactElement }) {
  return (
    <div className="card">
      <div className="card-header">
        <strong>{props.title}</strong>
      </div>
      <div className="card-body">{props.children}</div>
    </div>
  );
}
