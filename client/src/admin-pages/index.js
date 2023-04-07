import { Helmet } from 'react-helmet-async'
import { Box } from '@mui/material'

const Page = () => (
    <>
        <Helmet>
            {' '}
            [页面名]
            <title>Post</title>
        </Helmet>
        <Box
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        ></Box>
    </>
)

export default Page
