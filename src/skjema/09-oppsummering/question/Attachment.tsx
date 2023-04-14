import {Link} from "@navikt/ds-react";
import styled from "styled-components";
import {Felt} from "../../../generated/model";
import {baseURL} from "../../../lib/config";

const StyledList = styled.ul`
    padding-left: 1rem;
    margin-bottom: 1rem;
`;

export const Attachment = (props: {behandlingsId: string | undefined; felter?: Felt[]}) => {
    if (!props.felter || props.felter.length === 0) return null;

    return (
        <StyledList>
            {props.felter.map((felt) => {
                return felt.vedlegg?.map((vedlegg) => (
                    <li key={vedlegg.uuid}>
                        <Link href={`${baseURL}opplastetVedlegg/${props.behandlingsId}/${vedlegg.uuid}/fil`}>
                            {vedlegg.filnavn}
                        </Link>
                    </li>
                ));
            })}
        </StyledList>
    );
};
