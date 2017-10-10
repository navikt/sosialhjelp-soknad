declare module "nav-frontend-modal" {
	interface NavFrontendModal {
		isOpen?: boolean;
		onAfterOpen?: Function;
		onRequestClose?: Function;
		closeTimeoutMS?: number;
		style?: object;
		contentLabel?: string;
		closeButton?: boolean;
	}
	const t: new (props: NavFrontendModal) => React.Component<NavFrontendModal, any>;
	export default t;
}
