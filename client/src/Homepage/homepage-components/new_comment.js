import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { LockOutlined } from '@ant-design/icons'

const NewCommentForm = (postId) => {
    const [form] = Form.useForm()
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = (values) => {
        setSubmitting(true)
        // Do something with the post content and tag choices here, like sending them to a server
        console.log('the following is postid')
        console.log(postId)
        const { postContent } = values

        //Interface from back-end
        const parameters = {commentContent: postContent, post_id: postId}

        fetch(
            `http://localhost:5000/api/posts/comments`,
            {
                method: 'POST',
                body: JSON.stringify(parameters),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    //Success
                    console.log(data.message)

                }
                else {
                    //Something error in query or reply to himself
                    console.log(data.message)
                }
            })
        // handle create a comment for a particular post here, currently, frontend can only consider text comment
        // , the input to backend is : postContent (the text input
        // from the user), postId (id for the post which the comment belongs to)
        // update backend post db, comment db correspondingly,
        // no explicit return value is needed in frontend
        console.log('the following is postContent')
        console.log(postContent)
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
                label="Post your comment"
                name="postContent"
                rules={[
                    { required: false, message: 'Please enter post content' },
                ]}
            >
                <Input.TextArea
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    rows={4}
                    placeholder="What's your opinion about this post? Share it to your friends!"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={submitting}>
                    Post
                </Button>
            </Form.Item>
        </Form>
    )
}

export default NewCommentForm
