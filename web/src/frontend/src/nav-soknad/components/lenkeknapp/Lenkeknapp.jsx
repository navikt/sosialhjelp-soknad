"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var AriaAlternativeText_1 = require("../aria/AriaAlternativeText");
var classNames = require("classnames");
var baseClassName = "lenkeknapp";
var Lenkeknapp = /** @class */ (function (_super) {
    __extends(Lenkeknapp, _super);
    function Lenkeknapp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lenkeknapp.prototype.render = function () {
        var _a = this.props, onClick = _a.onClick, children = _a.children, style = _a.style, skjermleserLabel = _a.skjermleserLabel;
        var className = classNames("lenke", baseClassName, style ? baseClassName + "--" + style : null);
        return (<button onClick={onClick} className={className} type="button">
				<AriaAlternativeText_1.default visibleText={children} ariaText={skjermleserLabel}/>
			</button>);
    };
    return Lenkeknapp;
}(React.Component));
exports.default = Lenkeknapp;
