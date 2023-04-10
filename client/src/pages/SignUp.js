
import { Form, Input, Button } from 'antd';
import 'antd/dist/reset.css';
import './SignUp.css';
import logo from '../graphs/logo.jpeg';
import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios';
// import { signUpf } from './api';



const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    // const onFinish = async (values) => {
    //     try {
    //         const result = await signUpf(values);
    //         console.log(result); // success or fail
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='wrapper'>
            <img src={logo} alt="Logo" className="logo" />
            <div className="form-wrapper">
                <div className="form-container">
                    <h2>Sign Up in CUHub</h2>
                    <p className='greytext'>Welcome!</p>
                    <p className='greytext'>Please Enter Your Details.</p>
                    <Form>
                        <div className="input-container">
                            <label htmlFor="email">Email:</label>
                            <Form.Item name="email">
                                <Input type="email" id="email" placeholder='sample@gmail.com' />
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
                                            <EyeTwoTone onClick={toggleShowPassword} />
                                        ) : (
                                            <EyeInvisibleOutlined onClick={toggleShowPassword} />
                                        )
                                    }
                                />
                            </Form.Item>
                        </div>
                        <Button type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form>
                    <div className="login-wrapper">
                        <i className='greytext'>Already has an account?</i>
                        <a href='#'>Log in</a>
                    </div>
                </div>
            </div >
        </div>


    );
};

export default SignUp;
