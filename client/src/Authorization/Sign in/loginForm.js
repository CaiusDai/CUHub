import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Logo from '../../Images/Logo'

const LoginForm = () => {
    const [remember, setRemember] = useState(false)
    if (remember) {
        // for further use
        console.log('info for cookie')
    }

    const onFinish = (values) => {
        console.log('Form submitted!')
        let result = false
        console.log(values)
        const { username, password } = values
        console.log(password)
        fetch(
            `http://localhost:5000/api/login/?email=${username}&password=${password}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                result = data.data.result_code
                console.log(`The return result is: ${result}`)
                // the input for backend is stored in username and password,
                // please provide me a corresponding function that return result for further use
                // the result need to have at least 4 states: admin user, normal user, invalid, network err
                console.log('code can enter here')
                if (result === 0) {
                    console.log('Login as Admin')
                    window.location.href = '/admin'
                } else if (result === 1) {
                    console.log('Login successful!')
                    window.location.href = '/homepage'
                    // display an error message to the user
                } else if (result === 2) {
                    console.log('Login failed!')
                    alert('invalid username or password, please try again')
                    // display an error message to the user
                } else if (result === 3) {
                    console.log('Account Blocked!')
                    alert('you account has been blocked')
                } else {
                    console.log('unexpect return value')
                    alert(
                        'Unexpect return from server, please contact the developer'
                    )
                }
            })
            .catch((error) => console.error(error))
    }

    const onRememberChange = (e) => {
        setRemember(e.target.checked)
    }

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
            <Form
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{ minWidth: '300px' }}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="unchecked"
                        noStyle
                    >
                        <Checkbox onChange={onRememberChange}>
                            Remember me
                        </Checkbox>
                    </Form.Item>

                    <a href="/forgot-password" style={{ float: 'right' }}>
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                    >
                        Log in
                    </Button>
                    Or <a href="/signup">register now!</a>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginForm
