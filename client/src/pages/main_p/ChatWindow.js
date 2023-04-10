import Chat from './Chat';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Input, Button, Layout, Menu, Avatar } from 'antd';
import './ChatWindow.css';
import { PictureOutlined, SendOutlined } from '@ant-design/icons';

function ChatWindow() {
    const { userId } = useParams();
    const mockChats = [
        { id: 1, name: 'User 1', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'User 2', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 3, name: 'User 3', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: 4, name: 'User 4', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 5, name: 'User 5', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    ];
    // back-end support: provide the current user's id and the corresponding three columns
    const thisuser = [{ id: 0, name: 'User 0', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },];

    const [chattingUser, setChattingUser] = useState(mockChats[userId - 1]);
    // console.log(userId)
    // console.log(mockChats[userId])
    // console.log(chattingUser)
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };


    const handleSend = () => {
        if (inputValue) {
            const message = { sender_id: chattingUser.id, content: inputValue };
            setMessages([...messages, message]);
            setInputValue('');
        }
    };
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
        const mockSession = [
            {
                session_id: 1,
                user1: 0,
                user2: 1,
            },
        ];
        const mockmsg = [
            { session_id: 1, message_id: 1, sender_id: 0, content: "Hi there!" },
            { session_id: 1, message_id: 2, sender_id: 1, content: "Hey, how's it going?" },
            { session_id: 1, message_id: 3, sender_id: 0, content: "I'm good, thanks for asking." },
            { session_id: 1, message_id: 4, sender_id: 1, content: "Glad to hear it!" },
            { session_id: 1, message_id: 5, sender_id: 1, content: "Would you like to hang out with me this weekend?" },

        ];
        // Filtering the messages based on the current chatting user
        const filteredMessages = mockmsg.filter((msg) => msg.sender_id === chattingUser.id || msg.sender_id === 0);
        setMessages(filteredMessages);
    }, [chattingUser.id]);

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Chat />
            <Layout>
                <Layout.Content>
                    <div className='chatw'>
                        <span className='top fixed'>
                            <p>{chattingUser.name}</p>
                        </span>
                        <span className='top filler'>
                            <p>{chattingUser.name}</p>
                        </span>
                        <div className="messages">
                            {messages.map((message) => (
                                <div key={message.message_id} className={message.sender_id === chattingUser.id ? 'message message-right' : 'message message-left'}>
                                    {message.sender_id === chattingUser.id && (
                                        <Avatar src={chattingUser.avatar} />
                                    )}
                                    <div className="message-content">{message.content}</div>
                                    {message.sender_id !== chattingUser.id && (
                                        <Avatar src={thisuser[0].avatar} />
                                    )}
                                </div>
                            ))}
                        </div>


                        <div className="footer">
                            <div>
                                <PictureOutlined className="footer-icon" />
                            </div>
                            <input
                                className="footer-input"
                                type="text"
                                placeholder="Type your message..."
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            />
                            <button className="footer-button" onClick={handleSend}>
                                <SendOutlined className="footer-icon" />
                            </button>
                        </div>

                    </div>
                </Layout.Content>
            </Layout>
        </div>

    );
}

export default ChatWindow;
