import * as React from "react";
import { addLocaleData, IntlProvider as Provider } from "react-intl";
import * as nb from "react-intl/locale-data/nb";
import { connect } from "react-redux";
import { LedetekstState } from "./nav-soknad/redux/ledetekster/ledeteksterTypes";
import { DispatchProps } from "./nav-soknad/redux/reduxTypes";
import { REST_STATUS } from "./nav-soknad/types";
import {State} from "./digisos/redux/reducers";
import {initStart} from "./nav-soknad/redux/init/initActions";

addLocaleData(nb);

interface IntlProviderProps {
	children: React.ReactNode;
}

interface StateProps {
	ledetekster: LedetekstState;
	initRestStatus: REST_STATUS;
}

type Props = StateProps & IntlProviderProps & DispatchProps;

class IntlProvider extends React.Component<Props, {}> {
	componentDidMount() {
		this.props.dispatch(initStart());
	}

	render() {
		let { children } = this.props;
		const { ledetekster } = this.props;
		const locale = "nb";

		return (
			<Provider messages={ledetekster.data ? ledetekster.data : ""} defaultLocale="nb" locale={locale}>
				{children}
			</Provider>
		);
	}
}

export default connect((state: State) => {
	return {
		ledetekster: state.ledetekster,
		initRestStatus: state.init.restStatus
	};
})(IntlProvider);
