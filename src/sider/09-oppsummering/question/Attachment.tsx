import {Link} from "@navikt/ds-react";
import {Felt} from "../../../generated/client/model";
import digisosConfig from "../../../lib/config";
import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId";

export const Attachment = ({felter}: {felter?: Felt[]}) =>
    felter && (
        <ul className={"pl-4 mb-4"}>
            {felter.map(({vedlegg}) =>
                vedlegg?.map(({filnavn, uuid}) => (
                    <li key={uuid}>
                        <Link href={`${digisosConfig.baseURL}opplastetVedlegg/${useBehandlingsId()}/${uuid}/fil`}>
                            {filnavn}
                        </Link>
                    </li>
                ))
            )}
        </ul>
    );
