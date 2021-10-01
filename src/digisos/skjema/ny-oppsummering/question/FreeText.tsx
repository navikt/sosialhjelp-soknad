import {Felt} from "../../../redux/oppsummering/oppsummeringTypes";
import {FormattedText} from "./FormattedText";

export const FreeText = (props: {felter?: Felt[]}) => {
    if (!props.felter || props.felter.length === 0) return null;

    return (
        <div>
            {props.felter.map((felt) => (
                <FormattedText key={felt.svar.value} value={felt.svar.value} type={felt.svar.type} spacing />
            ))}
        </div>
    );
};
