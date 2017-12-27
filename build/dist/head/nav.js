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
import * as React from 'react';
var Nav = /** @class */ (function (_super) {
    __extends(Nav, _super);
    function Nav() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Nav.prototype.render = function () {
        return (React.createElement("div", { className: "nav", id: "nav" },
            React.createElement("div", null,
                React.createElement("a", { href: "javascript:void(0)", title: "天航Box,随身差旅管理平台" })),
            React.createElement("div", null,
                React.createElement("span", null,
                    "\u8BF7 ",
                    React.createElement("a", { title: "登录" }, "\u767B\u5F55"),
                    " \u6216 ",
                    React.createElement("a", { title: "免费注册" }, "\u514D\u8D39\u6CE8\u518C")),
                React.createElement("span", null, "\u5BA2\u670D\uFF1A1001-100-100"),
                ";",
                React.createElement("span", null,
                    " ",
                    React.createElement("span", null,
                        " \u8BBF\u95EE\u624B\u673A\u7248 ",
                        React.createElement("div", null,
                            " ",
                            React.createElement("img", { src: "" }),
                            " "),
                        " "),
                    " "))));
    };
    return Nav;
}(React.Component));
export default Nav;
//# sourceMappingURL=nav.js.map