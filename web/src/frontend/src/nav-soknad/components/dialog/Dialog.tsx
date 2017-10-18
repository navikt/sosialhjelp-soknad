import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import Icon, { icons } from "nav-frontend-ikoner-assets";
import { Innholdstittel } from "nav-frontend-typografi";
import { Hovedknapp } from "nav-frontend-knapper";

interface Props {
	dialogtittel: string;
	overskrift: string;
	okLabel: string;
	icon?: icons;
	onClose: () => void;
}

const Dialog: React.StatelessComponent<Props> = ({
	dialogtittel,
	overskrift,
	okLabel,
	icon,
	children,
	onClose
}) => (
	<NavFrontendModal
		isOpen={true}
		contentLabel={dialogtittel}
		closeButton={false}
		onRequestClose={() => null}
	>
		<div className="nav-soknad-dialog">
			{icon ? (
				<div className="nav-soknad-dialog__icon">
					<Icon kind={icon} />
				</div>
			) : null}
			<div className="nav-soknad-dialog__overskrift">
				<Innholdstittel>{overskrift}</Innholdstittel>
			</div>
			<div className="nav-soknad-dialog__content">{children}</div>
			<div className="nav-soknad-dialog__knapperad">
				<Hovedknapp onClick={onClose}>{okLabel}</Hovedknapp>
			</div>
		</div>
	</NavFrontendModal>
);

export default Dialog;
