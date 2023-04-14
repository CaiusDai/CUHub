import { Helmet } from 'react-helmet-async'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react'
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
import white from 'src/Images/white.png'
import { HiOutlineCake } from 'react-icons/hi'


const Page = () => {
    const [userData, setUserData] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState('')
    const userDataString = JSON.stringify(userData);
    const encodedUserDataString = encodeURIComponent(userDataString);
    const encodedavatarUrl = encodeURIComponent(avatarUrl);
    useEffect(() => {
        fetch(`http://localhost:5000/api/profiles/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((res) => {
                const data = res.data
                setUserData(data.profile)
                const profile_photo = data.profile.profile_photo
                return fetch(
                    `http://localhost:5000/api/images/avatars/${profile_photo}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    }
                )
            })
            .then((response) => response.blob())
            .then((blob) => {
                const objectURL = URL.createObjectURL(blob)
                setAvatarUrl(objectURL)
            })
    }, [])

    const formik = useFormik({
        onSubmit: async (values, helpers) => {
            helpers.setStatus({ success: true })
            helpers.setSubmitting(false)
        },
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
                            {/*1 */}
                            <Grid container spacing={3}>
                                <Grid style={{ height: '100%', width: '100%' }}>
                                    {/*2*/}
                                    <Card
                                        sx={{ p: 3 }}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                        }}
                                    >
                                        <form
                                            onSubmit={formik.handleSubmit}
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                            }}
                                        >
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
                                                style={{
                                                    height: '100%',
                                                    width: '100%',
                                                }}
                                                alignItems="center"
                                                direction="row"
                                                spacing={4}
                                                sx={{ mb: 3 }}
                                            >
                                                <Avatar
                                                    src={avatarUrl}
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
                                                        href={`/homepage/profile_edit?userdata=${encodedUserDataString}&avatar=${encodedavatarUrl}`}
                                                    >
                                                        Edit Profile
                                                    </Button>
                                                    <div></div>
                                                </div>
                                            </Stack>
                                            <Box sx={{ maxWidth: 600 }}>
                                                <Stack spacing={1}>
                                                    <Typography variant="h4">
                                                        {userData &&
                                                            userData.username}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        {userData &&
                                                            userData.email}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        {userData &&
                                                            userData.college}{' ('}{userData&&userData.major}{')'}
                                                    </Typography>
                                                    <Typography
                                                        variant="h5"
                                                        alignContent={
                                                            'space-between'
                                                        }
                                                    >
                                                        <SvgIcon>
                                                            <AiOutlineHeart />
                                                        </SvgIcon>
                                                        {userData &&
                                                            userData
                                                                .interests[0]}{', '}
                                                                {userData &&
                                                            userData
                                                                .interests[1]}{', '}
                                                                {userData &&
                                                            userData
                                                                .interests[2]}
                                                        <SvgIcon>
                                                            <VscBlank />
                                                        </SvgIcon>
                                                        <SvgIcon>
                                                            <HiOutlineCake />
                                                        </SvgIcon>{' '}
                                                        {userData &&
                                                            userData.birthday}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        Following{' '}
                                                        {userData &&
                                                            userData.num_of_following}
                                                        <SvgIcon>
                                                            <VscBlank />
                                                        </SvgIcon>
                                                        Followers{' '}
                                                        {userData &&
                                                            userData.num_of_follower}
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
