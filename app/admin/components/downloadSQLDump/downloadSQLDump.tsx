"use client";

import Link from "next/link";

export default function DownloadSQLDump() {
  return (
    <>
      <Link
        className="btn btn-outline-dark"
        href="/admin/api/get-dump"
        target="_blank"
      >
        getDump
      </Link>
    </>
  );
}
