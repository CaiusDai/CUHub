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
import { SvgIcon } from '@mui/material'
import backgroundimg from 'src/Images/bg.png'
import white from 'src/Images/white.png'
import { HiOutlineCake } from 'react-icons/hi'

const Page = () => {
    const [userData, setUserData] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState('')

    const handleFollowerClick = () => {
        console.log('Trying to get follower list')
        window.location.href = 'profile/follower_list'
    }

    const handleFollowingClick = () => {
        window.location.href = 'profile/following_list'
    }

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
                            <Grid container spacing={3} xs={12} md={8}>
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
                                                src={avatarUrl}
                                                sx={{
                                                    height: 64,
                                                    width: 64,
                                                }}
                                            />
                                            <div>
                                                <Button
                                                    sx={{ ml: 30 }}
                                                    color="primary"
                                                    size="small"
                                                    type="button"
                                                    variant="outlined"
                                                    href={`/homepage/profile_edit?avatar=${avatarUrl}`}
                                                >
                                                    Edit Profile
                                                </Button>
                                            </div>
                                        </Stack>
                                        <Box sx={{ maxWidth: 600 }}>
                                            <Stack spacing={1}>
                                                <Typography variant="h4">
                                                    {userData &&
                                                        userData.username}
                                                </Typography>
                                                <Typography variant="h6">
                                                    {userData && userData.email}
                                                </Typography>
                                                <Typography variant="h6">
                                                    {userData &&
                                                        userData.college}
                                                </Typography>
                                                <Typography variant="h6">
                                                    <SvgIcon>
                                                        <AiOutlineHeart />
                                                    </SvgIcon>
                                                    <span
                                                        style={{
                                                            margin: '0 8px',
                                                        }}
                                                    ></span>
                                                    {userData &&
                                                        userData.interests}
                                                    <span
                                                        style={{
                                                            margin: '0 8px',
                                                        }}
                                                    ></span>
                                                    <SvgIcon>
                                                        <HiOutlineCake />
                                                    </SvgIcon>{' '}
                                                    <span
                                                        style={{
                                                            margin: '0 8px',
                                                        }}
                                                    ></span>
                                                    {userData &&
                                                        userData.birthday}
                                                </Typography>
                                                <Typography variant="h6">
                                                    Following{' '}
                                                    {userData &&
                                                        userData.num_of_following}
                                                    <span
                                                        style={{
                                                            margin: '0 8px',
                                                        }}
                                                    ></span>
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
                                                    sx={{ ml: 2 }}
                                                >
                                                    Post
                                                </Button>

                                                <Button
                                                    color="primary"
                                                    size="large"
                                                    type="submit"
                                                    variant="outlined"
                                                    sx={{ ml: 2 }}
                                                    onClick={() =>
                                                        handleFollowerClick()
                                                    }
                                                >
                                                    Followers
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    size="large"
                                                    type="submit"
                                                    variant="outlined"
                                                    sx={{ ml: 2 }}
                                                    onClick={() =>
                                                        handleFollowingClick()
                                                    }
                                                >
                                                    Following
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    size="large"
                                                    type="submit"
                                                    variant="outlined"
                                                    sx={{ ml: 2 }}
                                                >
                                                    LikedPost
                                                </Button>
                                            </Box>
                                        </Box>
                                    </form>
                                </Card>
                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default Page
