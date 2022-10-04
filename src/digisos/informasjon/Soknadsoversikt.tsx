import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import React from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {format, formatDistance} from "date-fns";
import {nb} from "date-fns/locale";
import {SkjemaContent} from "../../nav-soknad/components/SkjemaContent";
import {digisosColors} from "../../nav-soknad/styles/variables";
import {State} from "../redux/reducers";
import {InformasjonSide} from ".";
import {DAYS_BEOFRE_DELETION, filterAndSortPabegynteSoknader} from "./pabegynteSoknaderUtils";
import {BodyShort, Label, Link, LinkPanel, Heading} from "@navikt/ds-react";
import {logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";
import {useHistory} from "react-router";
import {Attachment, FileProgress, Notes} from "@navikt/ds-icons";
import {getInnsynUrl} from "../../nav-soknad/utils/rest-utils";

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
        min-width: 3rem;
        width: 3rem;
        height: 3rem;

        margin-left: 0.5rem;
        margin-top: 0.5rem;
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
    padding: 0 1rem 0 1rem;

    .navds-link-panel {
        padding: 1rem;
    }
`;

const DokumentasjonsPanel = styled(Ekspanderbartpanel)`
    .ekspanderbartPanel__flex-wrapper {
        padding: 1rem;
    }
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

    const history = useHistory();

    const onPabegyntSoknadClick = (event: React.SyntheticEvent, href: string) => {
        event.preventDefault();
        logAmplitudeEvent("Klikk på påbegynt søknad", {
            antallPabegynteSoknader: pabegynteSoknader.length,
        });
        history.push(href);
    };

    return (
        <StyledSoknadsoversikt>
            <StartNySoknadPanel
                tittel={
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <PanelImageContainer>
                            <Notes />
                        </PanelImageContainer>
                        <Heading level="2" size="small">
                            Start en ny søknad
                        </Heading>
                    </div>
                }
            >
                <InformasjonSide antallPabegynteSoknader={pabegynteSoknader.length} />
            </StartNySoknadPanel>
            {pabegynteSoknader.length > 0 && (
                <PabegynteSoknaderPanel
                    tittel={
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <PanelImageContainer>
                                <FileProgress />
                            </PanelImageContainer>
                            <div>
                                <Heading level="2" size="small">
                                    Fortsett på en påbegynt søknad
                                </Heading>
                                <BodyShort>
                                    Du har {pabegynteSoknader.length} påbegynte søknader. <br />
                                    Vær oppmerksom på at disse slettes etter {DAYS_BEOFRE_DELETION} dager.
                                </BodyShort>
                            </div>
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
                                            href={`skjema/${pabegyntSoknad.behandlingsId}/1`}
                                            onClick={(event) =>
                                                onPabegyntSoknadClick(event, `skjema/${pabegyntSoknad.behandlingsId}/1`)
                                            }
                                            border
                                        >
                                            <LinkPanel.Title>
                                                <FlexContainer>
                                                    <Label style={{marginRight: "1rem"}}>
                                                        Sist oppdatert{" "}
                                                        {format(sistOppdatert, "d MMM yyyy", {locale: nb})}
                                                    </Label>
                                                    <BodyShort>
                                                        Slettes om{" "}
                                                        {formatDistance(deleteDate, currentDate, {locale: nb})}
                                                    </BodyShort>
                                                </FlexContainer>
                                            </LinkPanel.Title>
                                        </LinkPanel>
                                    </li>
                                );
                            })}
                        </StyledUnorderedList>
                    </PabegynteSoknaderPanelContent>
                </PabegynteSoknaderPanel>
            )}

            <DokumentasjonsPanel
                tittel={
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <PanelImageContainer>
                            <Attachment />
                        </PanelImageContainer>
                        <div>
                            <Heading level="2" size="small">
                                Send dokumentasjon til en innsendt søknad
                            </Heading>
                            <BodyShort>Dokumentasjon kan sendes til søknader du har sendt inn tidligere.</BodyShort>
                        </div>
                    </div>
                }
            >
                <div>
                    <ul>
                        <li>
                            Gå til listen over <Link href={getInnsynUrl()}>dine sosialhjelpssøknader</Link>
                        </li>
                        <li>Åpne søknaden du ønsker å ettersende dokumenter til</li>
                        <li>Last opp dokumentene du skal ettersende under “dine vedlegg”</li>
                    </ul>
                </div>
            </DokumentasjonsPanel>
        </StyledSoknadsoversikt>
    );
};
