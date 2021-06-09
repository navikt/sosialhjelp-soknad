import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Lenke from "nav-frontend-lenker";
import Panel from "nav-frontend-paneler";
import {Element, Normaltekst, Undertittel} from "nav-frontend-typografi";
import React from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {add, format, formatDistance} from "date-fns";
import {nb} from "date-fns/locale";
import {PaperClipIcon} from "../../nav-soknad/components/digisosIkon/PaperClipNoStyle";
import {SkjemaContent} from "../../nav-soknad/components/SkjemaContent";
import {digisosColors} from "../../nav-soknad/utils/colors";
import {State} from "../redux/reducers";
import Lenkepanel from "nav-frontend-lenkepanel";
import {InformasjonSide} from ".";

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;

    align-items: center;
    width: 100%;

    @media screen and (max-width: 520px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const PanelImageContainer = styled.div`
    background-color: ${digisosColors.digisosLysGronn};
    border-radius: 50%;
    overflow: hidden;

    height: 4rem;
    width: 4rem;
    min-width: 4rem;

    margin-right: 2rem;

    svg {
        min-width: 4rem;
        width: 4rem;
        height: 4rem;
        align-self: center;
    }
`;

const StyledSoknadsoversikt = styled(SkjemaContent)`
    margin-top: 2rem;

    max-width: 792px !important;

    .lenkepanel,
    .ekspanderbartPanel,
    .panel {
        margin-bottom: 1rem;
    }

    .lenkepanel,
    .panel {
        padding: 2rem;
    }
`;

const StartNySoknadPanel = styled(Ekspanderbartpanel)`
    .ekspanderbartPanel__flex-wrapper {
        padding: 1rem;
    }
    .ekspanderbartPanel__innhold {
        padding: 0rem;
    }
`;

const PabegynteSoknaderPanel = styled(Ekspanderbartpanel)`
    .ekspanderbartPanel__flex-wrapper {
        padding: 1rem;
    }
`;

const PabegynteSoknaderPanelContent = styled.div`
    padding: 0 1rem 1rem 1rem;

    .lenkepanel {
        padding: 1rem;
    }
`;

const DokumentasjonsPanel = styled(Panel)`
    border-color: #6a6a6a;
`;

const StyledUnorderedList = styled.ul`
    margin: 0rem;
    padding: 0rem;

    li {
        list-style: none;
    }
`;

export const Soknadsoversikt = (props: {onSoknadClick: (event: React.SyntheticEvent) => void}) => {
    const pabegynteSoknader = useSelector((state: State) => state.soknad.pabegynteSoknader);

    return (
        <StyledSoknadsoversikt>
            <StartNySoknadPanel tittel="Start en ny søknad">
                <InformasjonSide />
            </StartNySoknadPanel>
            {pabegynteSoknader.length > 0 && (
                <PabegynteSoknaderPanel
                    tittel={
                        <div>
                            <Undertittel>Fortsett på en påbegynt søknad</Undertittel>
                            <Normaltekst>
                                Du har {pabegynteSoknader.length} påbegynte søknader. Vær oppmerksom på at disse slettes
                                etter 14 dager.
                            </Normaltekst>
                        </div>
                    }
                >
                    <PabegynteSoknaderPanelContent>
                        <StyledUnorderedList>
                            {pabegynteSoknader.map((pabegyntSoknad) => {
                                const sistOppdatert = new Date(pabegyntSoknad.sistOppdatert);
                                const deleteDate = add(sistOppdatert, {days: 14});
                                return (
                                    <li key={pabegyntSoknad.behandlingsId}>
                                        <Lenkepanel
                                            tittelProps="normaltekst"
                                            href={`/sosialhjelp/soknad/skjema/${pabegyntSoknad.behandlingsId}/1`}
                                        >
                                            <FlexContainer>
                                                <Element style={{marginRight: "1rem"}}>Påbegynt søknad</Element>
                                                <Normaltekst>
                                                    Slettes om {formatDistance(deleteDate, sistOppdatert, {locale: nb})}{" "}
                                                    - Sist oppdatert {format(sistOppdatert, "d MMM yyyy", {locale: nb})}
                                                </Normaltekst>
                                            </FlexContainer>
                                        </Lenkepanel>
                                    </li>
                                );
                            })}
                        </StyledUnorderedList>
                    </PabegynteSoknaderPanelContent>
                </PabegynteSoknaderPanel>
            )}

            <DokumentasjonsPanel border>
                <FlexContainer>
                    <PanelImageContainer>
                        <PaperClipIcon />
                    </PanelImageContainer>
                    <div>
                        <Undertittel>Send dokumentasjon til en innsendt søknad</Undertittel>
                        <Normaltekst>Dokumentasjon kan sendes til søknader du har sendt inn tidligere.</Normaltekst>
                        <ul>
                            <li>
                                Gå til listen over{" "}
                                <Lenke href="https://www.nav.no/sosialhjelp/innsyn">dine sosialhjelpssøknader</Lenke>
                            </li>
                            <li>Åpne søknaden du ønsker å ettersende dokumenter til</li>
                            <li>Last opp dokumentene du skal ettersende under “dine vedlegg”</li>
                        </ul>
                    </div>
                </FlexContainer>
            </DokumentasjonsPanel>
        </StyledSoknadsoversikt>
    );
};
