import * as React from 'react';
// import { view as Nav } from './header/index';
// import { antnav as AntNav } from './header/index';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

const { Header, Footer, Content } = Layout;
class PageApp extends React.Component {
    render() {
        return (
            <div>
                {/*<Nav/>*/}
                {/*<AntNav/>*/}

                <Layout className="layout">
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>

            </div>
        );
    }
}

export default PageApp;