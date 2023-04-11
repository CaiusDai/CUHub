import { Helmet } from 'react-helmet-async'
import { useFormik } from 'formik'
import {
    Avatar,
    Box,
    Card,
    Container,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
} from '@mui/material'
import { AiOutlineHeart } from 'react-icons/ai'
import { VscBlank } from 'react-icons/vsc'
import { SvgIcon } from '@mui/material'
import useravatar from 'src/Images/useravatar.png'
import white from 'src/Images/white.png'
import { HiOutlineCake } from 'react-icons/hi'

const Page = () => {
    const formik = useFormik({
        onSubmit: async (values, helpers) => {
            helpers.setStatus({ success: true })
            helpers.setSubmitting(false)
        },
    })
    //here i need the corresponding user information
    let username = 'backend support'
    let email = 'backend support'
    let major = 'backend support'
    let college = 'backend support'
    let interest = 'backend support'
    let birthday = 'backend support'
    let followingnumber
    let followednumber

    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Box
                sx={{
                    flexGrow: 1,
                    py: 6,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <div>
                            <Grid container spacing={3}>
                                <Grid xs={12} md={8}>
                                    <Card sx={{ p: 3 }}>
                                        <form onSubmit={formik.handleSubmit}>
                                            <Avatar
                                                src={white}
                                                sx={{
                                                    height: 20,
                                                    width: 20,
                                                }}
                                            />
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={4}
                                                sx={{ mb: 3 }}
                                            >
                                                <Avatar
                                                    src={useravatar}
                                                    sx={{
                                                        height: 64,
                                                        width: 64,
                                                    }}
                                                />
                                            </Stack>
                                            <Box sx={{ maxWidth: 600 }}>
                                                <Stack spacing={1}>
                                                    <Typography variant="h4">
                                                        {username}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        {email}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        {major} ({college})
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        <SvgIcon>
                                                            <AiOutlineHeart />
                                                        </SvgIcon>
                                                        {interest}
                                                        <SvgIcon>
                                                            <VscBlank />
                                                        </SvgIcon>
                                                        <SvgIcon>
                                                            <HiOutlineCake />
                                                        </SvgIcon>
                                                        {birthday}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        {followingnumber}{' '}
                                                        Following
                                                        <SvgIcon>
                                                            <VscBlank />
                                                        </SvgIcon>
                                                        {followednumber}{' '}
                                                        Followers
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </form>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}
export default Page
