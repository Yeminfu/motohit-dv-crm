
export default function PartWrapper(props: { title: string; children: any }) {
    return <div className="card">
        <div className="card-header">
            <h4 className="m-0 p-0">{props.title}</h4>
        </div>
        <div className="card-body">
            {props.children}
        </div>
    </div>
}