import * as React from "react";

const Snakkeboble = (props: {children: any}) => (
    <div className="digisos-snakkeboble-wrapper">
        <div className="digisos-snakkeboble">
            <div className="digisos-snakkeboble-innhold">{props.children}</div>
            <i className="digisos-snakkeboble-pil" />
        </div>
    </div>
);

export default Snakkeboble;
