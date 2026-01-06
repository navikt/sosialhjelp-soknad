import {Link} from "@navikt/ds-react";
import {Felt} from "../../../generated/model";
import digisosConfig from "../../../lib/config";
import {useSoknadId} from "../../../lib/hooks/common/useSoknadId.ts";

export const Attachment = ({felter}: {felter?: Felt[]}) =>
    felter && (
        <ul className={"pl-4 mb-4"}>
            {felter.map(({vedlegg}) =>
                vedlegg?.map(({filnavn, uuid}) => (
                    <li key={uuid}>
                        <Link href={`${digisosConfig.baseURL}opplastetVedlegg/${useSoknadId()}/${uuid}/fil`}>
                            {filnavn}
                        </Link>
                    </li>
                ))
            )}
        </ul>
    );
