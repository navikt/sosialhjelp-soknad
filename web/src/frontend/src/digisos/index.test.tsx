import * as React from "react";
import * as ReactDOM from "react-dom";
import IntlProvider from "../intlProvider";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<IntlProvider>
			<div />
		</IntlProvider>,
		div
	);
});
