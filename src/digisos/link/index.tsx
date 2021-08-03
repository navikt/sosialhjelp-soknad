import * as React from "react";
import {Redirect} from "react-router";

const Link = () => {
    const url = window.location.href;
    const match: RegExpMatchArray | null = url.match(/goto=\/sosialhjelp\/soknad(.+?)(&login_id.*$|$)/);
    let here: string = "/informasjon";
    if (match && match[1]) {
        here = match[1];
    }

    return (
        <div className="application-spinner">
            <Redirect to={here} />
        </div>
    );
};

export default Link;
