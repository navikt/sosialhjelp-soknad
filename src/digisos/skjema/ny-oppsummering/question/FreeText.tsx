import {BodyLong, Label} from "@navikt/ds-react";
import {Warning} from "./Warning";

export const FreeText = (props: {title: string; value?: string}) => {
    return (
        <div>
            <Label spacing>{props.title}</Label>

            {props.value ? <BodyLong spacing>{props.value}</BodyLong> : <Warning />}
        </div>
    );
};
