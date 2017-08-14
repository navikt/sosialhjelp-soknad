import * as React from "react";
import { Knapp } from "nav-frontend-knapper";
import Spinner from "nav-frontend-spinner";
import { Input } from "nav-frontend-skjema";

const Frontend: React.StatelessComponent<any> = () => {
	return (
		<div>
			<Knapp type="standard">Hei</Knapp>
			<Spinner ariaLabel="dfas" storrelse="xxl" />
			<Input label="Ett label" />
		</div>
	);
};

export default Frontend;
