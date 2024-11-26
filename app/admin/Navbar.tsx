import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="p-2">
        <div className="container">
          <div className="d-flex">
            <Link href={"/admin"} className="btn btn-sm btn-outline-dark">
              /admin
            </Link>
            <Link
              href={"/admin/config"}
              className="btn btn-sm btn-outline-dark ms-2"
            >
              /admin/config
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
