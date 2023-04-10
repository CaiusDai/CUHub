import { useState } from 'react';
import { Input, Button, List } from 'antd';
import './Left_part.css';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../graphs/logo.jpeg';
import { Link } from 'react-router-dom';
import Chat from './Chat';

function Left_part(props) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue) {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const { Sider } = Layout;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Sider className="left-part" width={350}>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
          <Link to="/friends-post">Friends' Post</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<MessageOutlined />}>
          <Link to="/chat">Chat</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        <div style={{ height: 'calc(100vh - 200px)', marginBottom: '0px' }}></div>
      </Menu>
    </Sider>
  );
}

export default Left_part;
