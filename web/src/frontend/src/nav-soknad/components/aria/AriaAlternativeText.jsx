"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var AriaText_1 = require("./AriaText");
var AriaAlternativeText = function (_a) {
    var ariaText = _a.ariaText, visibleText = _a.visibleText;
    if (!ariaText) {
        return <span>{visibleText}</span>;
    }
    return (<span>
			<AriaText_1.default>{ariaText}</AriaText_1.default>
			<span aria-hidden={true} role="presentation">
				{visibleText}
			</span>
		</span>);
};
exports.default = AriaAlternativeText;
