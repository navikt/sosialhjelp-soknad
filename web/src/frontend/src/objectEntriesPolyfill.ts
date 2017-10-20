const polyfillObjectEntries = () => {
	if (!Object.entries) {
		Object.entries = (obj: object) => {
			const ownProps = Object.keys(obj);
			let i = ownProps.length;
			const resArray = new Array(i);

			while (i--) {
				resArray[i] = [ownProps[i], obj[ownProps[i]]];
			}
			return resArray;
		};
	}
};
export default polyfillObjectEntries;
