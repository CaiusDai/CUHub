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
                console.log('the following is data for announcement')
                console.log(data)
                console.log(announcements)
                // Do something
            }
        })
        .catch((error) => {
            console.error('Error fetching announcements:', error)
        })
}

const AnnouncementDialog = () => {
    console.log('code can enter here')
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
                // Do something
            }
        })
        .catch((error) => {
            console.error('Error fetching announcements:', error)
        })

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
