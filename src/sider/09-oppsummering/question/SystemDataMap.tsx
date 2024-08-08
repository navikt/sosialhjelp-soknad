import {FormattedText} from "./FormattedText";
import {Felt} from "../../../generated/client/model";
import {SYSTEM_LIST_STYLE} from "./SystemData";

export const SystemDataMap = ({felter}: {felter?: Felt[]}) => (
    <>
        {felter?.map((felt, index) => (
            <ul className={SYSTEM_LIST_STYLE} key={index}>
                {Object.entries(felt.labelSvarMap ?? {}).map(([label, {value, type}]) => (
                    <li key={label}>
                        <FormattedText value={value ?? ""} type={type ?? "TEKST"} labelBackendKey={label} />
                    </li>
                ))}
            </ul>
        ))}
    </>
);
