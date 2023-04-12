import { useState } from 'react'
import { Input, Button, List } from 'antd'
import './chat_p/Chat.css'
import { Layout, Avatar } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'

function ChatPage() {
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')
    // back-end support: user name, id, avatar
    const mockChats = [
        {
            id: 1,
            name: 'User 1',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
            id: 2,
            name: 'User 2',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
        {
            id: 3,
            name: 'User 3',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
        {
            id: 4,
            name: 'User 4',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        {
            id: 5,
            name: 'User 5',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
    ]
    const location = useLocation()
    const userId = location.pathname.endsWith('/chat')
        ? null
        : location.pathname.split('/').pop()

    const handleSend = () => {
        if (inputValue) {
            setMessages([...messages, inputValue])
            setInputValue('')
        }
    }

    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         handleSend()
    //     }
    // }

    // const handleInputChange = (event) => {
    //     setInputValue(event.target.value)
    // }

    return (
        <div className="chat-container">
            <style>
                {`
        /* Hide scrollbar */
        ::-webkit-scrollbar {
          display: none;
        }
        `}
            </style>
            <Layout className="chatmiddle">
                <Layout.Sider width={350}>
                    <div className="chat">
                        <div className="chat-top fixed">
                            <div className="chat-title">
                                <span>Chat</span>
                            </div>
                            <div className="chat-requests">
                                <span>Chat </span>
                                {/* <div className="request-arrow">&gt;</div> */}
                            </div>
                            <Input.Search
                                placeholder="Search for people and group"
                                className="chat-search"
                                style={{ backgroundColor: '#f0f0f0' }}
                                enterButton={
                                    <Button
                                        icon={
                                            <SearchOutlined
                                                style={{ color: '#fff' }}
                                            />
                                        }
                                        style={{
                                            backgroundColor: '#1DA1F2',
                                            border: 'none',
                                        }}
                                    />
                                }
                            />
                        </div>
                        <div className="chat-top filler">
                            <div className="chat-title">
                                <span>Chat</span>
                            </div>
                            <div className="chat-requests">
                                <span>Chat Requests</span>
                                <div className="request-arrow">&gt;</div>
                            </div>
                            <Input.Search
                                placeholder="Search for people and group"
                                className="chat-search"
                            />
                        </div>
                        <div className="chat-users">
                            <List dataSource={mockChats}>
                                {mockChats.map((user) => (
                                    <Link
                                        key={user.id}
                                        to={`/homepage/chat/${user.id}`}
                                    >
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar src={user.avatar}>
                                                        {user.name.charAt(0)}
                                                    </Avatar>
                                                }
                                                title={
                                                    <span
                                                        style={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <span>{user.name}</span>
                                                        <span className="user-id">
                                                            @{user.id}
                                                        </span>
                                                    </span>
                                                }
                                            />
                                        </List.Item>
                                    </Link>
                                ))}
                            </List>
                        </div>
                    </div>
                </Layout.Sider>
                {/* <Layout.Content style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="chat-window-container">
                            {userId != null ? <ChatWindow userId={userId} /> : <img src={chatIcon} alt="Chat Icon" />}
                        </div>
                    </div>

                </Layout.Content> */}
            </Layout>
        </div>
    )
}
export default ChatPage
