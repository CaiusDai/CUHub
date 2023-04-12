import { Link as RouterLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Box, Button, Container, Typography } from '@mui/material'
import notfoundimage from 'src/Images/illustration-not-found.svg'
const Page = () => (
    <>
        <Helmet>
            <title>Error: Not Found | CU Hub</title>
        </Helmet>
        <Box
            sx={{
                backgroundColor: 'background.paper',
                flexGrow: 1,
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    px: 5,
                    py: 14,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        '& img': {
                            maxWidth: '100%',
                        },
                    }}
                >
                    <img src={notfoundimage} alt="not found" />
                </Box>
                <Typography align="center" sx={{ my: 2 }} variant="h3">
                    Nothing here!
                </Typography>
                <Typography
                    align="center"
                    color="text.secondary"
                    variant="body2"
                >
                    The page requested does not exist.
                </Typography>
                <Button to="/" component={RouterLink} sx={{ mt: 2 }}>
                    Take me home
                </Button>
            </Container>
        </Box>
    </>
)

export default Page
