import * as React from "react";
import { addLocaleData, IntlProvider as Provider } from "react-intl";
import * as nb from "react-intl/locale-data/nb";

addLocaleData(nb);

interface IntlProviderState {
	ledetekster: object;
}

interface IntlProviderProps {
	children: React.ReactNode;
}

const STATUS = "status";
const DATA = "data";

class IntlProvider extends React.Component<IntlProviderProps, IntlProviderState> {

	constructor(props:  IntlProviderProps) {
		super(props);
		this.state = {
			ledetekster: {status: null, data: {nb: {}}}
		};
	}

	/* tslint:disable */
	componentDidMount() {
		this.setState({ledetekster: {status: 0, data: {nb: {}}}});
		fetch('http://localhost:3001/api/tekster')
			.then(response => response.json())
			.then(texts => {
				this.setState({ledetekster: {status: 200, data: texts}});
			})
			.catch(error => {
				console.log(`request failed ${error}`);
			});
	}
	/* tslint:enable */

	render() {
		const ledetekster = this.state.ledetekster;
		const locale = "nb";
		const children = this.state.ledetekster[STATUS] === 200 ? this.props.children : <span>Spinner</span>;
		return (
			<Provider messages={ ledetekster[DATA][locale] } defaultLocale="nb" locale={ locale }>
				{ children }
			</Provider>
		);
	}
}

export default IntlProvider;
