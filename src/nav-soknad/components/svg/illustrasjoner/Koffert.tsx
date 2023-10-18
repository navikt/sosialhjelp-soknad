import * as React from "react";

const Koffert = () => (
    <svg aria-hidden="true" width={100} height={100} className="kun_desktop" pointerEvents="none">
        <title>Koffert</title>
        <g fill="none" fillRule="evenodd">
            <circle cx={50} cy={50} r={50} fill="#CDE7D8" />
            <g transform="translate(24 28)">
                <path fill="#3E3821" d="M0 21h52v21a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V21z" />
                <path fill="#514C37" d="M2 7h48a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2z" />
                <rect width={10} height={7} x={21} y={21} fill="#FFBD66" rx={1} />
                <path
                    stroke="#65604E"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M17 8c0-4.418 4.025-8 9-8 4.97 0 9 3.582 9 8"
                />
            </g>
        </g>
    </svg>
);

export default Koffert;
