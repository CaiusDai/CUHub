import React, { useState } from 'react'
import { Form, Input, Button, Select, Upload, message } from 'antd'
import { LockOutlined, UploadOutlined } from '@ant-design/icons'

const { Option } = Select

const NewAnnouncementForm = () => {
    const [form] = Form.useForm()
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = (values) => {
        setSubmitting(true)
        // Do something with the post content, tag choices, and image here, like sending them to a server
        const { postContent } = values

        // handle create a announcement here, currently, the input to backend is : postContent (the text input
        // update backend post db correspondingly, no explicit return value is needed in frontend
        console.log(postContent)
        const formData = new FormData()

        // fetch('http://localhost:5000/api/posts/new', {
        //   method: 'POST',
        //   body: formData,
        //   credentials: 'include',
        // })
        //   .then((response) => response.json())
        //   .then((result) => {
        //     const status = result.status
        //     if (status === 'fail') {
        //       const errorCode = result.data.error_code
        //       // Do something
        //     } else if (status === 'error') {
        //       // Wrong fetch format
        //       const message = result.message
        //     } else {
        //       const data = result.data
        //       const announcements = data.announcements
        //       console.log('new post submit successfully')
        //       // Do something
        //     }
        //   })
        //   .catch((error) => {
        //     console.error('Error fetching announcements:', error)
        //   })
        console.log('the following is postContent')
        console.log(postContent)
        // Reset the form after submission
        form.resetFields()
        setSubmitting(false)
    }

    const handleUploadChange = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} uploaded successfully`)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} upload failed`)
        }
    }

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            encType="multipart/form-data"
            autoComplete="off"
            style={{
                backgroundColor: '#fff',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Form.Item
                label="New Announcement"
                name="postContent"
                rules={[
                    {
                        required: false,
                        message: 'Put your announcement content here',
                    },
                ]}
            >
                <Input.TextArea
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    rows={4}
                    placeholder="Put your announcement content here"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={submitting}>
                    Post Announcement
                </Button>
            </Form.Item>
        </Form>
    )
}

export default NewAnnouncementForm
