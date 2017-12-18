import * as React from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import Lenkeknapp from "../lenkeknapp/Lenkeknapp";
import { Fil } from "../../redux/vedlegg/vedleggTypes";
import { REST_STATUS } from "../../types/restTypes";
import AriaText from "../aria/AriaText";
import SVG from "react-inlinesvg";

interface Props extends React.Props<any> {
	filer: Fil[];
	faktumKey: string;
	slettFil(faktumKey: string, filNavn: string): void;
	lastNedVedlegg(filNavn: string): void;
}

const VedleggsListe: React.StatelessComponent<Props> = ({
	filer,
	faktumKey,
	slettFil,
	lastNedVedlegg
}) => {
	return (
		<div className="vedleggsliste">
			{filer &&
				filer.map((fil: Fil) => (
					<div key={fil.navn} className="vedleggsliste__vedlegg">
						<span className="vedleggsliste__filnavn">
							<Lenkeknapp onClick={() => lastNedVedlegg(fil.navn)}>
								{fil.navn}
							</Lenkeknapp>
						</span>
						{fil.status !== REST_STATUS.OK && (
							<span className="vedleggsliste__spinner">
								<NavFrontendSpinner type="XS" />
							</span>
						)}
						{fil.status === REST_STATUS.OK && (
							<span className="vedleggsliste__slett_ikon">
								<button
									type="button"
									className="vedleggsliste__kunSkjermleser_knapp"
									onClick={() => slettFil(faktumKey, fil.navn)}
								>
									<AriaText>Slett {fil.navn}</AriaText>
									<SVG
										className="vedleggsliste__slett_ikon"
										src="/soknadsosialhjelp/statisk/bilder/remove-circle.svg"
									/>
								</button>
							</span>
						)}
					</div>
				))}
		</div>
	);
};

export default VedleggsListe;
