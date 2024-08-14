import {FormattedText} from "./FormattedText";
import {Felt, Svar} from "../../../generated/model";

export const FreeText = ({felter}: {felter?: Felt[]}) => (
    <>
        {felter
            ?.filter((felt): felt is Felt & {svar: Svar} => !!felt.svar)
            .map(({svar}, index) => (
                <span className={"pb-3"} key={index}>
                    <FormattedText value={svar.value ?? ""} type={svar.type} />
                </span>
            ))}
    </>
);
