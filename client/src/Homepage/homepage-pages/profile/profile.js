import { Helmet } from 'react-helmet-async'
import { useFormik } from 'formik'
import {
    Avatar,
    Box,
    Button,
    Card,
    Container,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
} from '@mui/material'
import { AiOutlineHeart } from 'react-icons/ai'
import { VscBlank } from 'react-icons/vsc'
import { SvgIcon } from '@mui/material'
import backgroundimg from 'src/Images/bg.png'
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
    let username,email,major,college,birthday,interests,gender

    fetch(
        `http://localhost:5000/api/profile`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }
    )
        .then((response) => response.json())
        .then((res)=>{
            const data = res.data
            //data.profile is in the format{username,major,gender,birthday,college,interests,email}
            username = data.profile.username
            email = data.profile.email
            major = data.profile.major
            college = data.profile.college
            birthday = data.profile.birthday
            interests = data.profile.interests
            gender = data.profile.gender
            
        })

    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Box
                sx={{
                    flexGrow: 1,
                    py: 0,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <div>
                            <Grid container spacing={3}>
                                <Grid xs={12} md={8}>
                                    <Card sx={{ p: 3 }}>
                                        <form onSubmit={formik.handleSubmit}>
                                            <img
                                                style={{
                                                    maxWidth: 600,
                                                    width: 'auto',
                                                }}
                                                src={backgroundimg}
                                                alt="backgroundpic"
                                            />
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
                                                <div>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <Button
                                                        color="primary"
                                                        size="small"
                                                        type="button"
                                                        variant="outlined"
                                                        href="/homepage/profile_edit"
                                                    >
                                                        Edit Profile
                                                    </Button>
                                                    <div></div>
                                                </div>
                                            </Stack>
                                            <Box sx={{ maxWidth: 600 }}>
                                                <Stack spacing={1}>
                                                    <Typography variant="h4">
                                                        User Name{' '}
                                                        {/*Here I need the username*/}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        email{' '}
                                                        {/*Here I need the email*/}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        Major (College Name){' '}
                                                        {/*Here I need the major anf college name*/}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        <SvgIcon>
                                                            <AiOutlineHeart />
                                                        </SvgIcon>
                                                        interest{' '}
                                                        {/*Here I need the interest*/}
                                                        <SvgIcon>
                                                            <VscBlank />
                                                        </SvgIcon>
                                                        <SvgIcon>
                                                            <HiOutlineCake/>
                                                        </SvgIcon>
                                                        YYYY-MM-DD
                                                        {/*Here I need the number of Following*/}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        (number) Following{' '}
                                                        {/*Here I need the number of Following*/}
                                                        <SvgIcon>
                                                            <VscBlank />
                                                        </SvgIcon>
                                                        (number) Followers{' '}
                                                        {/*Here I need the number of Followers*/}
                                                    </Typography>
                                                </Stack>
                                                <Box sx={{ mt: 3 }}>
                                                    <Button
                                                        color="primary"
                                                        size="large"
                                                        type="submit"
                                                        variant="outlined"
                                                    >
                                                        Post
                                                    </Button>

                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <Button
                                                        color="primary"
                                                        size="large"
                                                        type="submit"
                                                        variant="outlined"
                                                    >
                                                        Followers
                                                    </Button>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <Button
                                                        color="primary"
                                                        size="large"
                                                        type="submit"
                                                        variant="outlined"
                                                    >
                                                        Following
                                                    </Button>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <Button
                                                        color="primary"
                                                        size="large"
                                                        type="submit"
                                                        variant="outlined"
                                                    >
                                                        LikedPost
                                                    </Button>
                                                </Box>
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
