import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import React from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {format, formatDistance} from "date-fns";
import {nb} from "date-fns/locale";
import {PaperClipIcon} from "../../nav-soknad/components/digisosIkon/PaperClipNoStyle";
import {SkjemaContent} from "../../nav-soknad/components/SkjemaContent";
import {digisosColors} from "../../nav-soknad/styles/variables";
import {State} from "../redux/reducers";
import {InformasjonSide} from ".";
import {DAYS_BEOFRE_DELETION, filterAndSortPabegynteSoknader} from "./pabegynteSoknaderUtils";
import {BodyShort, Label, Link, LinkPanel, Panel, Title} from "@navikt/ds-react";

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

    @media screen and (max-width: 520px) {
        display: none;
    }

    svg {
        min-width: 4rem;
        width: 4rem;
        height: 4rem;
        align-self: center;
    }
`;

const StyledSoknadsoversikt = styled(SkjemaContent)`
    margin-top: 2rem;
    padding: 0 0.5rem;

    max-width: 792px !important;

    .navds-link-panel,
    .ekspanderbartPanel,
    .navds-panel {
        margin-bottom: 1rem;
    }

    .navds-link-panel,
    .navds-panel {
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

    .navds-body-short {
        font-weight: 400;
    }
`;

const PabegynteSoknaderPanelContent = styled.div`
    padding: 0 1rem 1rem 1rem;

    .navds-link-panel {
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

export const Soknadsoversikt = () => {
    const currentDate = new Date();

    const pabegynteSoknader = filterAndSortPabegynteSoknader(
        useSelector((state: State) => state.soknad.pabegynteSoknader),
        currentDate
    );

    return (
        <StyledSoknadsoversikt>
            <StartNySoknadPanel
                tittel={
                    <Title level="2" size="s">
                        Start en ny søknad
                    </Title>
                }
            >
                <InformasjonSide enableModalV2={true} />
            </StartNySoknadPanel>
            {pabegynteSoknader.length > 0 && (
                <PabegynteSoknaderPanel
                    tittel={
                        <div>
                            <Title level="2" size="s">
                                Fortsett på en påbegynt søknad
                            </Title>
                            <BodyShort>
                                Du har {pabegynteSoknader.length} påbegynte søknader. Vær oppmerksom på at disse slettes
                                etter {DAYS_BEOFRE_DELETION} dager.
                            </BodyShort>
                        </div>
                    }
                >
                    <PabegynteSoknaderPanelContent>
                        <StyledUnorderedList>
                            {pabegynteSoknader.map((pabegyntSoknad) => {
                                const sistOppdatert = pabegyntSoknad.lastUpdatedDate;
                                const deleteDate = pabegyntSoknad.deleteDate;
                                return (
                                    <li key={pabegyntSoknad.behandlingsId}>
                                        <LinkPanel
                                            href={`/sosialhjelp/soknad/skjema/${pabegyntSoknad.behandlingsId}/1`}
                                            border
                                        >
                                            <FlexContainer>
                                                <Label style={{marginRight: "1rem"}}>
                                                    Sist oppdatert {format(sistOppdatert, "d MMM yyyy", {locale: nb})}
                                                </Label>
                                                <BodyShort>
                                                    Slettes om {formatDistance(deleteDate, currentDate, {locale: nb})}
                                                </BodyShort>
                                            </FlexContainer>
                                        </LinkPanel>
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
                        <Title level="2" size="s">
                            Send dokumentasjon til en innsendt søknad
                        </Title>
                        <BodyShort>Dokumentasjon kan sendes til søknader du har sendt inn tidligere.</BodyShort>
                        <ul>
                            <li>
                                Gå til listen over{" "}
                                <Link href="https://www.nav.no/sosialhjelp/innsyn">dine sosialhjelpssøknader</Link>
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
