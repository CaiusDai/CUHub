import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

// there is no input fromm the frontend,
// announcement( if any ), is needed from backend,
// currently, only title and content is considered
const from_backend = () => {
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
                const errorCode = result.data.error_code
                // Do something
            } else if (status === 'error') {
                // Wrong fetch format
                const message = result.message
            } else {
                const data = result.data
                const announcements = data.announcements
                // Do something
            }
        })
        .catch((error) => {
            console.error('Error fetching announcements:', error)
        })
}

const AnnouncementDialog = () => {
    return (
        <Card
            title={
                <Title level={5} style={{ marginBottom: 0 }}>
                    {'Important Announcement'}
                </Title>
            }
            bordered={true}
            style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)' }}
        >
            <Paragraph>
                {
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus massa non nulla eleifend, non dignissim sapien egestas.'
                }
            </Paragraph>
        </Card>
    )
}

export default AnnouncementDialog
