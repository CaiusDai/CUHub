import React, { useState } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { LockOutlined } from '@ant-design/icons'

const { Option } = Select

const NewPostForm = () => {
    const [form] = Form.useForm()
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = (values) => {
        setSubmitting(true)
        // Do something with the post content and tag choices here, like sending them to a server
        const { postContent, tagChoices } = values

        // handle create a post here, currently, frontend can only consider text content, you can take it as
        // every post do not have a image input currently, the input to backend is : postContent (the text input
        // from the user), tagChoices (mandatory tag from user), update backend post db correspondingly,
        // no explicit return value is needed in frontend
        console.log('the following is postContent')
        console.log(postContent)
        console.log('the following is tagChoices')
        console.log(tagChoices)
        // Reset the form after submission
        form.resetFields()
        setSubmitting(false)
    }

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            autoComplete="off"
            style={{
                backgroundColor: '#fff',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Form.Item
                label="Post Content"
                name="postContent"
                rules={[
                    { required: false, message: 'Please enter post content' },
                ]}
            >
                <Input.TextArea
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    rows={4}
                    placeholder="What happens to you today? Share it to your friends!"
                />
            </Form.Item>
            <Form.Item
                label="Tag Choices"
                name="tagChoices"
                rules={[
                    { required: true, message: 'Please select tag choices' },
                ]}
            >
                <Select mode="multiple" placeholder="Please select tag choices">
                    <Option value="Tree Hole">Tree Hole</Option>
                    <Option value="Job Seeking">Job Seeking</Option>
                    <Option value="Trading">Trading</Option>
                    <Option value="Academic">Academic</Option>
                    <Option value="Info">Info</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={submitting}>
                    Post
                </Button>
            </Form.Item>
        </Form>
    )
}

export default NewPostForm
