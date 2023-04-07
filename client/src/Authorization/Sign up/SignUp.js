import { Form, Input, Button } from 'antd'
import 'antd/dist/reset.css'
import './SignUp.css'
import React, { useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import Logo from '../../Images/Logo'

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onFinish = (values) => {
        console.log('Form submitted!')
        const { email, username, password } = values
        console.log('the following is email')
        console.log(email)
        console.log('the following is username')
        console.log(username)
        console.log('the following is password')
        console.log(password)
        // the input for backend is stored in email, username and password,
        // please provide me a corresponding function that return result for further use
        // the result need to have at least 3 states: email or username already been used, register successful, network err
        const result = false
        if (result) {
            console.log('Sign Up successful!')
            // window.location.href = '/homepage';
        } else {
            console.log('Sign In failed failed!')
            alert(
                'You are using a email or user name that has been used, please try again'
            )
            // display an error message to the user
        }
    }
    // const onFinish = (values) => {
    //     console.log('Received values of form: ', values);
    // };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'middle',
                marginLeft: '65px',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Logo />
            <div className="form-wrapper">
                <div className="form-container">
                    <h2>Sign Up in CUHub</h2>
                    <p className="greytext">Welcome!</p>
                    <p className="greytext">Please Enter Your Details.</p>
                    <Form
                        name="normal_login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        style={{ minWidth: '300px' }}
                    >
                        <div className="input-container">
                            <label htmlFor="email">Email:</label>
                            <Form.Item name="email">
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="sample@gmail.com"
                                />
                            </Form.Item>
                        </div>
                        <div className="input-container">
                            <label htmlFor="username">Username:</label>
                            <Form.Item name="username">
                                <Input type="text" id="username" />
                            </Form.Item>
                        </div>
                        <div className="input-container">
                            <label htmlFor="password">Password:</label>
                            <Form.Item name="password">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    suffix={
                                        showPassword ? (
                                            <EyeTwoTone
                                                onClick={toggleShowPassword}
                                            />
                                        ) : (
                                            <EyeInvisibleOutlined
                                                onClick={toggleShowPassword}
                                            />
                                        )
                                    }
                                />
                            </Form.Item>
                        </div>
                        <Button type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
