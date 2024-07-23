export default function Modal(props: { isOpen: boolean, closeFn: any, title: string, children: any }) {
    if (!props.isOpen) return null;
    return <>
        <div
            className="p-2"
            style={{
                position: "fixed",
                right: 0,
                top: 0,
                minWidth: "500px",
                height: "100vh",
                background: "#fff",
                zIndex: 2,
                overflowY: "scroll"
            }}>
            <div className="card">
                <div className="p-2">
                    <div className="card-title">
                        <h1>{props.title}</h1>
                    </div>
                    <div className="card-body px-0">
                        <div>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            //фон, закрывающий модалку
            onClick={() => {
                props.closeFn();
            }}
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                background: "rgba(238, 238, 238, 0.50)"
            }}></div>
    </>
}