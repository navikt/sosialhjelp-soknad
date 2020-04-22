import * as React from "react";

const KredittkortIllustrasjon: React.FC = () => {
    return (
        <div>
            <svg width={100} height={100} className="kun_desktop">
                <g fill="none" fillRule="evenodd">
                    <circle cx={50} cy={50} r={50} fill="#CDE7D8" />
                    <g transform="translate(20 32)">
                        <rect width={60} height={36} fill="#005B82" rx={3} />
                        <rect width={5} height={5} x={47} y={5} fill="#3E3821" fillOpacity={0.6} rx={1} />
                        <rect width={5} height={5} x={50} y={6} fill="#3E3821" fillOpacity={0.8} rx={1} />
                        <path
                            fill="#FFF"
                            fillOpacity={0.4}
                            d="M6 21a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1z"
                        />
                        <rect width={11} height={8} x={5} y={11} fill="#FFF" fillOpacity={0.2} rx={2} />
                    </g>
                </g>
            </svg>
            <svg width={80} height={80} className="kun_mobil">
                <g fill="none" fillRule="evenodd">
                    <circle cx={40} cy={40} r={40} fill="#CDE7D8" />
                    <g transform="translate(13 24)">
                        <path
                            fill="#005B82"
                            d="M2 0h50a2 2 0 0 1 2 2v29a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"
                        />
                        <path
                            fill="#3E3821"
                            fillOpacity={0.6}
                            d="M46 3h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
                        />
                        <path
                            fill="#3E3821"
                            fillOpacity={0.8}
                            d="M48 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
                        />
                        <path
                            fill="#FFF"
                            fillOpacity={0.4}
                            d="M3 19a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1z"
                        />
                        <rect width={9} height={6} x={2} y={11} fill="#FFF" fillOpacity={0.2} rx={1} />
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default KredittkortIllustrasjon;
