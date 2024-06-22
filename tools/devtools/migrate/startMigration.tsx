"use client"

import axios from "axios";

export default function StartMigration() {
    return <>
        <button className="btn btn-outline-dark"
            onClick={() => {
                axios(
                    "/api/migrate"
                )
                // alert();
            }}
        >migrate()</button>
    </>;
}