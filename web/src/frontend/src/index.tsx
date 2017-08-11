import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

import App from "./app/containers/App";

ReactDOM.render(
	<App />,
	document.getElementById("root") as HTMLElement
);
registerServiceWorker();
