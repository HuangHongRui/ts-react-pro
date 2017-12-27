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
// import { view as Nav } from './header/index';
// import { antnav as AntNav } from './header/index';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
var Header = Layout.Header, Footer = Layout.Footer, Content = Layout.Content;
var PageApp = /** @class */ (function (_super) {
    __extends(PageApp, _super);
    function PageApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageApp.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Layout, { className: "layout" },
                React.createElement(Header, null,
                    React.createElement("div", { className: "logo" }),
                    React.createElement(Menu, { theme: "dark", mode: "horizontal", defaultSelectedKeys: ['2'], style: { lineHeight: '64px' } },
                        React.createElement(Menu.Item, { key: "1" }, "nav 1"),
                        React.createElement(Menu.Item, { key: "2" }, "nav 2"),
                        React.createElement(Menu.Item, { key: "3" }, "nav 3"))),
                React.createElement(Content, { style: { padding: '0 50px' } },
                    React.createElement("div", { style: { background: '#fff', padding: 24, minHeight: 280 } }, "Content")),
                React.createElement(Footer, { style: { textAlign: 'center' } }, "Ant Design \u00A92016 Created by Ant UED"))));
    };
    return PageApp;
}(React.Component));
export default PageApp;
//# sourceMappingURL=PageApp.js.map