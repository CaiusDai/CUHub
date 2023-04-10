import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

// there is no input form the frontend,
// announcement( if any ), is needed from backend,
// currently, only title and content is considered
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
