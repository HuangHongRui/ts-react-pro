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
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
var SubMenu = Menu.SubMenu;
var MenuItemGroup = Menu.ItemGroup;
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            current: 'mail',
        };
        _this.handleClick = function (e) {
            _this.setState({
                current: e.key,
            });
        };
        return _this;
    }
    App.prototype.render = function () {
        return (React.createElement(Menu, { onClick: this.handleClick, selectedKeys: [this.state.current], mode: "horizontal" },
            React.createElement(Menu.Item, { key: "mail" },
                React.createElement(Icon, { type: "mail" }),
                "Navigation One"),
            React.createElement(Menu.Item, { key: "app", disabled: true },
                React.createElement(Icon, { type: "appstore" }),
                "Navigation Two"),
            React.createElement(SubMenu, { title: React.createElement("span", null,
                    React.createElement(Icon, { type: "setting" }),
                    "Navigation Three - Submenu") },
                React.createElement(MenuItemGroup, { title: "Item 1" },
                    React.createElement(Menu.Item, { key: "setting:1" }, "Option 1"),
                    React.createElement(Menu.Item, { key: "setting:2" }, "Option 2")),
                React.createElement(MenuItemGroup, { title: "Item 2" },
                    React.createElement(Menu.Item, { key: "setting:3" }, "Option 3"),
                    React.createElement(Menu.Item, { key: "setting:4" }, "Option 4"))),
            React.createElement(Menu.Item, { key: "alipay" },
                React.createElement("a", { href: "javascript:void(0)", target: "_blank", rel: "noopener noreferrer" }, "Navigation Four - Link"))));
    };
    return App;
}(React.Component));
export default App;
//# sourceMappingURL=antHead.js.map