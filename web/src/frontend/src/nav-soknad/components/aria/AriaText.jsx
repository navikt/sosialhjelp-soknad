"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var AriaText = function (props) {
    return (<span id={props.id} className="kunSkjermleser">
			{props.children}
		</span>);
};
exports.default = AriaText;
