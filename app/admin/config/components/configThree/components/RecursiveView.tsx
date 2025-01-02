import ts_configWithChildren from "../types/ts_configWithChildren";

export default function RecursiveView(props: {
  config: ts_configWithChildren;
}) {
  return (
    <div className="card">
      <div className="card-header">
        <strong>Conf: {props.config.name}</strong>
      </div>
      <div className="card-body">
        {props.config.children.map((config) => (
          <RecursiveView config={config} key={config.id} />
        ))}
      </div>
    </div>
  );
}
