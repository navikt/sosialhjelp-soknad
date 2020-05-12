import * as React from "react";

const Banner: React.StatelessComponent<{children: React.ReactNode} & {}> = ({children}) => {
    return (
        <div className="banner">
            <div className="blokk-center">
                <h1 className="banner__tittel">{children}</h1>
            </div>
        </div>
    );
};

export default Banner;
