import * as React from "react";
import { Knapp } from "nav-frontend-knapper";
import Spinner from "nav-frontend-spinner";
import { Input } from "nav-frontend-skjema";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Frontend: React.StatelessComponent<any> = () => {
	return (
		<div>
			<Link to="/">
				<FormattedMessage id="skjema.tittel" />
			</Link>
			<br />
			<br />
			<Link to="/">
				<FormattedMessage id="arbeidbolk.tittel" />
			</Link>
			<Knapp type="standard">Hei</Knapp>
			<Spinner ariaLabel="dfas" storrelse="xxl" />
			<Input label="Ett label" />
		</div>
	);
};

export default Frontend;
