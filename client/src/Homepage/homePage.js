import React from 'react'
import { Layout, Menu } from 'antd'

const { Header, Content, Footer } = Layout

const Main = () => {
    return (
        <Layout>
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">About</Menu.Item>
                    <Menu.Item key="3">Contact</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <h1>Welcome to my website!</h1>
                    <p>
                        Here you can find information about me and my projects.
                    </p>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2021 Created by Ant UED
            </Footer>
        </Layout>
    )
}

export default Main
