import { Card, Typography } from 'antd'
import { useEffect, useState } from 'react'

const { Title, Paragraph } = Typography

// there is no input fromm the frontend,
// announcement( if any ), is needed from backend,
// currently, only title and content is considered

const AnnouncementDialog = () => {
    console.log('code can enter here')
    const [isLoading, setIsLoading] = useState(true)
    const [postToDisplay, setPostToDisplay] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/announcements/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((result) => {
                const status = result.status
                if (status === 'fail') {
                    console.log('get announcement failed')
                    const errorCode = result.data.error_code
                    console.log(errorCode)
                    // Do something
                } else if (status === 'error') {
                    // Wrong fetch format
                    console.log('error fetch format when getting announcement')
                    const message = result.message
                    console.log(message)
                } else {
                    const data = result.data
                    const announcements = data.announcements
                    console.log(announcements)
                    console.log('the following is data for announcement')
                    console.log(data)
                    setPostToDisplay(data.announcements) // Update postToDisplay using the state setter
                    setIsLoading(false) // Set loading state to false
                    // Do something
                }
            })
            .catch((error) => {
                console.error('Error fetching announcements:', error)
            })
    }, [])

    if (isLoading) {
        // Render a loading message while the posts are being retrieved
        return <div>Loading posts...</div>
    }

    return (
        <Card
            title={
                <Title level={5} style={{ marginBottom: 0 }}>
                    {postToDisplay[0].title}
                </Title>
            }
            bordered={true}
            style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)' }}
        >
            <Paragraph>{postToDisplay[0].content}</Paragraph>
        </Card>
    )
}

export default AnnouncementDialog
