const forventAt: any = Object.assign(expect);

forventAt.extend({
	validerer(recevied?: any) {
		const pass = (typeof recevied === "undefined");
		if (pass) {
			return {
				message: () =>
					`forventet ikke feilmelding`,
				pass: true,
			};
		} else {
			return {
				message: () =>
					`forventet ikke feilmelding`,
				pass: false,
			};
		}
	},
	girFeilmelding(recevied: any, feilmelding?: any) {
		const pass = recevied && feilmelding && recevied === feilmelding;
		if (pass) {
			return {
				message: () =>
					`forventet feilmelding`,
				pass: true,
			};
		} else {
			return {
				message: () =>
					`forventet feilmelding`,
				pass: false,
			};
		}
	}
});

export default forventAt;