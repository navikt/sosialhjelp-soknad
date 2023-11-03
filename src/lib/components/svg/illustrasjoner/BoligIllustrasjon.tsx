import * as React from "react";

const BoligIllustrasjon = () => (
    <svg
        aria-hidden="true"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={100}
        height={100}
        className="kun_desktop"
        pointerEvents="none"
    >
        <title>Bolig</title>
        <defs>
            <path id="bolig_desktop_a" d="M9 20L34 4l25 16v34H9z" />
        </defs>
        <g fill="none" fillRule="evenodd">
            <circle cx={50} cy={50} r={50} fill="#CDE7D8" />
            <path fill="#B7B1A9" d="M28 26h8v15h-8zm-1-2h10v2H27z" />
            <g transform="translate(16 23)">
                <use fill="#005B82" xlinkHref="#bolig_desktop_a" />
                <use fill="#FFF" xlinkHref="#bolig_desktop_a" />
            </g>
            <path fill="#E9E7E7" d="M25 74h50v3H25z" />
            <path fill="#D6897D" stroke="#3E3821" strokeWidth={2} d="M32 48h14v26H32z" />
            <path fill="#3E3821" d="M30 74h18v2H30zm-2 2h22v2H28z" />
            <path fill="#E0F5FB" stroke="#3E3821" strokeWidth={2} d="M54 48h14v14H54z" />
            <path fill="#3E3821" d="M23.81 45h-7.334L50 23l33.524 22H76.19L50 28.238z" />
        </g>
    </svg>
);

export default BoligIllustrasjon;
