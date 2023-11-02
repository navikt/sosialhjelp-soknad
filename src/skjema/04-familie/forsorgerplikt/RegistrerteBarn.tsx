import * as React from "react";
import {useForsorgerplikt} from "./useForsorgerplikt";
import {BarnSkjema} from "./BarnSkjema";
import {BarnSysteminfo} from "./BarnSysteminfo";

const RegistrerteBarn = () => {
    const {forsorgerplikt} = useForsorgerplikt();

    if (!forsorgerplikt) return null;

    return (
        <div>
            {forsorgerplikt?.ansvar?.map((ansvar, index: number) => (
                <React.Fragment key={index}>
                    <BarnSysteminfo barnIndex={index} />
                    <BarnSkjema barnIndex={index} />
                </React.Fragment>
            ))}
        </div>
    );
};

export default RegistrerteBarn;
