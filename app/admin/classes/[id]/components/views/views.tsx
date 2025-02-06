export default async function Views(props: { idClass: number }) {
  return (
    <>
      <div className="card">
        <div className="card-header">Представления</div>
        <div className="card-body">
          <>{props.idClass}</>
        </div>
      </div>
    </>
  );
}
