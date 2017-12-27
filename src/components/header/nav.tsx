import * as React from 'react';

class Nav extends React.Component {
    render() {
        return (
            <div className="nav" id="nav">

                <div><a href="javascript:void(0)" title="天航Box,随身差旅管理平台"/></div>
                <div>
                    <span>请 <a title="登录">登录</a> 或 <a title="免费注册">免费注册</a></span>
                    <span>客服：1001-100-100</span>;
                    <span> <span> 访问手机版 <div> <img src=""/> </div> </span> </span>
                    {/* <span><a title="消息"></a></span>
                <span><a href="javascript:void(0)" title="查看订单">查看订单</a></span>
                <span><a href="javascript:void(0)" title="退出" >退出</a></span> */}
                </div>

            </div>
        );
    }
}
export default Nav;