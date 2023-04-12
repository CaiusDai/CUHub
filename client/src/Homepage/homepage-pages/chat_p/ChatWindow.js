import Chat from '../Chat'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Layout, Avatar } from 'antd'
import './ChatWindow.css'
import { PictureOutlined, SendOutlined } from '@ant-design/icons'

function ChatWindow() {
    const { userId } = useParams()
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
    // back-end support: provide the current user's id and the corresponding three columns
    const thisuser = [
        {
            id: 0,
            name: 'User 0',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        },
    ]

    const [chattingUser, setChattingUser] = useState(mockChats[userId - 1])
    // console.log(userId)
    // console.log(mockChats[userId])
    // console.log(chattingUser)
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend()
        }
    }

    const handleSend = () => {
        if (inputValue) {
            const message = { sender_id: chattingUser.id, content: inputValue }
            setMessages([...messages, message])
            setInputValue('')
        }
    }
    // this is for back end
    // const handleSend = async () => {
    //     if (inputValue) {
    //       const newMessage = { session_id: mockSession[0].session_id, sender_id: userId, content: inputValue };
    //       try {
    //         const response = await fetch('/api/messages', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json'
    //           },
    //           body: JSON.stringify(newMessage)
    //         });
    //         if (response.ok) {
    //           setMessages([...messages, newMessage]);
    //           setInputValue('');
    //         } else {
    //           console.error('Error sending message:', response.statusText);
    //         }
    //       } catch (error) {
    //         console.error('Error sending message:', error);
    //       }
    //     }
    //   };

    useEffect(() => {
        // Mocking the fetching of chat history
        const mockmsg = [
            {
                session_id: 1,
                message_id: 1,
                sender_id: 0,
                content: 'Hi there!',
            },
            {
                session_id: 1,
                message_id: 2,
                sender_id: 1,
                content: "Hey, how's it going?",
            },
            {
                session_id: 1,
                message_id: 3,
                sender_id: 0,
                content: "I'm good, thanks for asking.",
            },
            {
                session_id: 1,
                message_id: 4,
                sender_id: 1,
                content: 'Glad to hear it!',
            },
            {
                session_id: 1,
                message_id: 5,
                sender_id: 1,
                content: 'Would you like to hang out with me this weekend?',
            },
            { session_id: 1, message_id: 6, sender_id: 0, content: 'Sure!' },
            {
                session_id: 1,
                message_id: 7,
                sender_id: 0,
                content: 'How about we go to the park and have a picnic?',
            },
            {
                session_id: 1,
                message_id: 8,
                sender_id: 1,
                content: 'Sounds like a great idea!',
            },
            {
                session_id: 1,
                message_id: 9,
                sender_id: 1,
                content: 'What kind of food do you like?',
            },
            {
                session_id: 1,
                message_id: 10,
                sender_id: 0,
                content: 'I like sandwiches, fruit, and chips.',
            },
            {
                session_id: 1,
                message_id: 11,
                sender_id: 1,
                content: "Okay, I'll bring some sandwiches and chips.",
            },
            {
                session_id: 1,
                message_id: 12,
                sender_id: 1,
                content: 'Do you like playing frisbee?',
            },
            {
                session_id: 1,
                message_id: 13,
                sender_id: 0,
                content: "Yeah, I'm not too bad at it.",
            },
            {
                session_id: 1,
                message_id: 14,
                sender_id: 1,
                content: 'Great, we can play frisbee after we eat.',
            },
            {
                session_id: 1,
                message_id: 15,
                sender_id: 0,
                content: 'That sounds like fun.',
            },
            {
                session_id: 1,
                message_id: 16,
                sender_id: 0,
                content: 'What time should we meet?',
            },
            {
                session_id: 1,
                message_id: 17,
                sender_id: 1,
                content: 'How about noon on Saturday?',
            },
            {
                session_id: 1,
                message_id: 18,
                sender_id: 0,
                content: 'Okay, see you then!',
            },
            {
                session_id: 1,
                message_id: 19,
                sender_id: 1,
                content: 'Looking forward to it.',
            },
            {
                session_id: 1,
                message_id: 20,
                sender_id: 1,
                content: 'Have a great day!',
            },
        ]

        // Filtering the messages based on the current chatting user
        const filteredMessages = mockmsg.filter(
            (msg) => msg.sender_id === chattingUser.id || msg.sender_id === 0
        )
        setMessages(filteredMessages)
    }, [chattingUser.id])
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                height: '100vh',
            }}
        >
            <Chat />
            <Layout>
                <Layout.Content>
                    <style>
                        {`
        /* Hide scrollbar */
        ::-webkit-scrollbar {
          display: none;
        }
        `}
                    </style>
                    <div className="chatw">
                        <span className="top fixed">
                            <p>{chattingUser.name}</p>
                        </span>
                        <span className="top filler">
                            <p>{chattingUser.name}</p>
                        </span>
                        <div className="messages">
                            {messages.map((message) => (
                                <div
                                    key={message.message_id}
                                    className={
                                        message.sender_id === chattingUser.id
                                            ? 'message message-right'
                                            : 'message message-left'
                                    }
                                >
                                    {message.sender_id === chattingUser.id && (
                                        <Avatar src={chattingUser.avatar} />
                                    )}
                                    <div className="message-content">
                                        {message.content}
                                    </div>
                                    {message.sender_id !== chattingUser.id && (
                                        <Avatar src={thisuser[0].avatar} />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div
                            style={{
                                position: 'fixed',
                                bottom: 0,
                                marginRight: 'auto',
                                marginLeft: 'auto',
                                width: '435px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: '#f0f0f0',
                                    padding: '8px 16px',
                                }}
                            >
                                <PictureOutlined
                                    style={{
                                        fontSize: '20px',
                                        marginRight: '16px',
                                    }}
                                />
                                <input
                                    style={{
                                        flex: 1,
                                        height: '32px',
                                        padding: '0 8px',
                                        borderRadius: '16px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    placeholder="Start your message..."
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                />
                                <button
                                    style={{
                                        marginLeft: '16px',
                                        backgroundColor: '#1890ff',
                                        color: 'white',
                                        borderRadius: '16px',
                                        border: 'none',
                                        padding: '4px 16px',
                                    }}
                                    onClick={handleSend}
                                >
                                    <SendOutlined
                                        style={{ fontSize: '20px' }}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </Layout.Content>
            </Layout>
        </div>
    )
}

export default ChatWindow