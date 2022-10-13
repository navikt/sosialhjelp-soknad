import * as React from "react";
import {FormattedMessage} from "react-intl";
import {useDispatch} from "react-redux";
import PersonopplysningerUtfyllendeModal from "./PersonopplysningerUtfyllendeModal";
import {getContextPathForStaticContent} from "../../../configuration";
import {visSamtykkeInfo} from "../../redux/soknad/soknadActions";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";
import {BodyLong, Heading} from "@navikt/ds-react";
import styled from "styled-components";

const LeftAlignedButton = styled(LinkButton)`
    text-align: left;
`;

const PersonopplysningPanel = styled.div`
    padding-top: 2rem;
`;

const PersonopplysningBlokk = styled.div`
    position: relative;
    padding-left: 6.25rem;
    margin-top: 2rem;

    .ikon {
        position: absolute;
        text-align: center;
        width: 5rem;
        left: 0%;
        top: 50%;
        transform: translate(0, -50%);
    }

    @media screen and (max-width: 520px) {
        padding-left: 0;
        position: relative;

        .ikon {
            padding-top: 2rem;
            width: 100%;
            height: 5rem;
            position: relative;
            text-align: center;
            transform: translate(0, 0);

            img {
                height: 100%;
            }
        }

        .innhold {
            margin-top: 2rem;
        }
    }
`;

const AndreSporsmalTekst = styled.div`
    margin-top: 1rem;
`;

const PersonopplysningerKortfattet = () => {
    const dispatch = useDispatch();

    return (
        <PersonopplysningPanel>
            <Heading level="2" size="medium" spacing>
                <FormattedMessage id="informasjon.tekster.personopplysninger.tittel" />
            </Heading>

            <PersonopplysningBlokk>
                <div className="ikon">
                    <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_papirstabel.svg`} alt={""} />
                </div>
                <div className="innhold">
                    <Heading level="3" size="small" spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.innhenting.tittel" />
                    </Heading>
                    <BodyLong spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.innhenting.tekst" />
                    </BodyLong>
                </div>
            </PersonopplysningBlokk>
            <PersonopplysningBlokk>
                <div className="ikon">
                    <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_blyanter.svg`} alt={""} />
                </div>
                <div className="innhold">
                    <Heading level="3" size="small" spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.fordusender.tittel" />
                    </Heading>
                    <BodyLong spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.fordusender.tekst" />
                    </BodyLong>
                </div>
            </PersonopplysningBlokk>
            <PersonopplysningBlokk>
                <div className="ikon">
                    <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_brevkonvolutt.svg`} alt={""} />
                </div>
                <div className="innhold">
                    <Heading level="3" size="small" spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.ettersendt.tittel" />
                    </Heading>
                    <BodyLong spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.ettersendt.tekst" />
                    </BodyLong>
                </div>
            </PersonopplysningBlokk>

            <PersonopplysningBlokk>
                <div className="ikon">
                    <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_ark.svg`} alt={""} />
                </div>
                <div className="innhold">
                    <Heading level="3" size="small" spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.tittel" />
                    </Heading>
                    <BodyLong spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.tekst" />
                    </BodyLong>
                    <LeftAlignedButton
                        className="navds-link"
                        onClick={() => {
                            dispatch(visSamtykkeInfo(true));
                        }}
                    >
                        <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke" />
                    </LeftAlignedButton>
                </div>
            </PersonopplysningBlokk>

            <AndreSporsmalTekst>
                <BodyLong>
                    <FormattedMessage id="informasjon.tekster.personopplysninger.sporsmal" />
                </BodyLong>
            </AndreSporsmalTekst>
            <PersonopplysningerUtfyllendeModal />
        </PersonopplysningPanel>
    );
};

export default PersonopplysningerKortfattet;
