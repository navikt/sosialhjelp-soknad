import * as React from "react";

const SnakkebobleIllustrasjon: React.FC = () => {
    return (
        <div>
            <svg width={100} height={100} className="kun_desktop">
                <g fill="none" fillRule="evenodd">
                    <circle cx={50} cy={50} r={50} fill="#CDE7D8" />
                    <path
                        fill="#FFF"
                        d="M57 64L40 76V64H23a3 3 0 0 1-3-3V28a3 3 0 0 1 3-3h54a3 3 0 0 1 3 3v33a3 3 0 0 1-3 3H57z"
                    />
                    <path fill="#B7B1A9" d="M33 37h34v3H33v-3zm0 6h34v3H33v-3zm0 6h22v3H33v-3z" />
                </g>
            </svg>
            <svg width={80} height={80} className="kun_mobil">
                <g fill="none" fillRule="evenodd">
                    <circle cx={40} cy={40} r={40} fill="#CDE7D8" />
                    <path
                        fill="#FFF"
                        d="M46 52L32 62V52H19a3 3 0 0 1-3-3V23a3 3 0 0 1 3-3h42a3 3 0 0 1 3 3v26a3 3 0 0 1-3 3H46z"
                    />
                    <path fill="#B7B1A9" d="M27 30h26v2H27v-2zm0 5h26v2H27v-2zm0 5h17v2H27v-2z" />
                </g>
            </svg>
        </div>
    );
};

export default SnakkebobleIllustrasjon;
