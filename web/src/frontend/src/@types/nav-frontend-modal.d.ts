declare module "nav-frontend-modal" {
	interface NavFrontendModal {
		isOpen?: boolean;
		onAfterOpen?: () => void;
		onRequestClose?: () => void;
		closeTimeoutMS?: number;
		style?: object;
		contentLabel?: string;
		closeButton?: boolean;
		shouldCloseOnOverlayClick?: boolean;
	}
	const t: new (props: NavFrontendModal) => React.Component<NavFrontendModal, any>;
	export default t;
}
