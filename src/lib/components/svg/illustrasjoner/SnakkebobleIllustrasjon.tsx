import * as React from "react";

const SnakkebobleIllustrasjon: React.FC = () => (
    <svg aria-hidden="true" width={100} height={100} className="kun_desktop" pointerEvents="none">
        <title>Snakkeboble</title>
        <g fill="none" fillRule="evenodd">
            <circle cx={50} cy={50} r={50} fill="#CDE7D8" />
            <path
                fill="#FFF"
                d="M57 64L40 76V64H23a3 3 0 0 1-3-3V28a3 3 0 0 1 3-3h54a3 3 0 0 1 3 3v33a3 3 0 0 1-3 3H57z"
            />
            <path fill="#B7B1A9" d="M33 37h34v3H33v-3zm0 6h34v3H33v-3zm0 6h22v3H33v-3z" />
        </g>
    </svg>
);

export default SnakkebobleIllustrasjon;
