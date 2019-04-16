import * as React from 'react';
import {Opplysning} from "../../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";

interface Props {
    opplysning: Opplysning
}

const VedleggSlettet: React.FC<Props> = (props: Props) => {
    return (
        <div className="vedlegg_slettet_wrapper">
            <div className="vedlegg_slettet_boks">
                <div className="vedlegg_slettet_ikon">
                    <div className="vedlegg_slettet_border">
                        <img src="/soknadsosialhjelp/statisk/bilder/ikon_reportProblemCircle.svg" alt=""/>
                    </div>
                </div>
                <div className="vedlegg_slettet_tekst">
                    Vi har slettet vedlegget for { props.opplysning.type } fordi du ikke lenger har svart at du har { props.opplysning.type }
                </div>
            </div>
        </div>
    );
};

export default VedleggSlettet;
