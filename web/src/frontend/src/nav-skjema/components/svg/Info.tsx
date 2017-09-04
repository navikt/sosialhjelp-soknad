/* tslint:disable*/
import * as React from "react";

interface Props {
	prop?: any;
}

const Info: React.StatelessComponent<Props> = (props: Props) =>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 100.1 100"
		className="infoIcon">
		<title>all</title>
		<path d="M56.7 76.6H43.3v-33h13.3v33zM50 38.1c-4 0-7.3-3.3-7.3-7.3s3.3-7.3 7.3-7.3 7.3 3.3 7.3 7.3-3.3 7.3-7.3 7.3z" />
		<path d="M85.4 14.6c-19.5-19.5-51.2-19.5-70.7 0s-19.5 51.2 0 70.7 51.2 19.5 70.7 0c19.5-19.4 19.6-51 .2-70.5-.1 0-.2-.1-.2-.2zm-5.6 65.2C63.1 96.1 36.4 95.7 20.2 79c-15.9-16.4-15.9-42.5 0-58.8 16.5-16.5 43.2-16.5 59.7 0 16.4 16.5 16.4 43.2-.1 59.6z" />
		<circle cx="50" cy="30.7" r="7.3" />
		<path d="M43.3 43.6h13.3v33H43.3z" />
	</svg>;

export default Info;
