import {FormattedText} from "./FormattedText";
import {Felt, Svar} from "../../../generated/client/model";

export const SYSTEM_LIST_STYLE = "list-none py-2 pl-4 border-l-[1px] border-l-[var(--a-border-default)] mb-4";

export const SystemData = (props: {felter?: Felt[]}) => {
    if (!props.felter?.length) return null;

    return (
        <ul className={SYSTEM_LIST_STYLE}>
            {props.felter
                ?.filter((felt): felt is Felt & {svar: Svar} => !!felt.svar)
                .map(({label, svar: {value, type}}) => (
                    <li key={label}>
                        <FormattedText value={value!} type={type} labelBackendKey={label} />
                    </li>
                ))}
        </ul>
    );
};
