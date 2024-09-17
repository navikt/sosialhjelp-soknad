import * as React from "react";
import {useForsorgerplikt} from "../../lib/hooks/data/useForsorgerplikt";
import {BarnSkjema} from "./BarnSkjema";
import {BarnSysteminfo} from "./BarnSysteminfo";
import {Barnebidrag} from "./Barnebidrag";

interface Props {
    skipForm?: boolean;
}

export const RegistrerteBarn = ({skipForm}: Props) => {
    const {forsorgerplikt} = useForsorgerplikt();

    if (!forsorgerplikt) return null;

    return (
        <div className={"space-y-24"}>
            {forsorgerplikt?.ansvar?.map((_ansvar, index: number) => (
                <React.Fragment key={index}>
                    <BarnSysteminfo barnIndex={index} />
                    {!skipForm && <BarnSkjema barnIndex={index} />}
                </React.Fragment>
            ))}
            {!skipForm && <Barnebidrag />}
        </div>
    );
};
