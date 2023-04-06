import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const LoginForm = () => {
    const [remember, setRemember] = useState(false)
    if (remember) {
        // for further use
        console.log('info for cookie')
    }

    const onFinish = (values) => {
        console.log('Form submitted!')
        let result = false
        const { username_input, password_input } = values
        fetch(`http://localhost:5000/api/login?username='${username_input}'&password ='${password_input}'`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>response.json())
        .then((data)=>{
            console.log(data)
            result = data
            console.log(`The return result is: ${result}`)
        })
        .catch(error =>console.error(error))
        // the input for backend is stored in username and password,
        // please provide me a corresponding function that return result for further use
        // the result need to have at least 4 states: admin user, normal user, invalid, network err
        console.log('code can enter here')
        if (result) {
            console.log('Login successful!')
            // redirect to the home page
        } else {
            console.log('Login failed!')
            // display an error message to the user
        }
    }

    const onRememberChange = (e) => {
        setRemember(e.target.checked)
    }

    return (
        <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ minWidth: '300px' }}
        >
            <Form.Item
                name="username"
                rules={[
                    { required: true, message: 'Please input your Username!' },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Please input your Password!' },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="unchecked" noStyle>
                    <Checkbox onChange={onRememberChange}>Remember me</Checkbox>
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
    )
}

export default LoginForm
