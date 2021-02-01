import * as React from "react";

const Snakkeboble = (props: {children: any}) => (
    <div className="digisos-snakkeboble-wrapper">
        <div className="digisos-snakkeboble">
            <div className="digisos-snakkeboble-innhold">{props.children}</div>
            <span className="digisos-snakkeboble-pil" aria-hidden="true" />
        </div>
    </div>
);

export default Snakkeboble;
