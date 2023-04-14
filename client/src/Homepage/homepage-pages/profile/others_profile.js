import { Helmet } from 'react-helmet-async'
import { useFormik } from 'formik'
import React, { useState, useEffect } from 'react'
import { PostTable } from '../../homepage-sections/post-table'
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
import { useParams } from 'react-router-dom'
const OtherProfilePage = () => {
    const { id } = useParams()

    const [isLoading, setIsLoading] = useState(true) // Add loading state

    const [othersProfileToDisplay, setOthersProfileToDisplay] = useState([])

    const [othersPostToDisplay, setOthersPostToDisplay] = useState([])

    const [followStatusToDisplay, setFollowStatusToDisplay] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/profiles/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    //Successfully get profile of other user
                    console.log(data.message)
                    const follow_status = data.data.follow_status
                    const profile = data.data.profile //profile is object of profile, contains username,major,gender, birthday,
                    //college,interests,email,profile_photo,num_of_follower,num_of_following
                    const posts = data.data.posts //posts is array of posts
                    console.log(profile)
                    setOthersProfileToDisplay(profile)
                    setFollowStatusToDisplay(follow_status)
                    setOthersPostToDisplay(posts)
                    setIsLoading(false)
                } else {
                    //error or unauthorized
                    console.log(data.message)
                }
            })
    }, [])

    // here is the interface for view others profile, the id above provide to you
    // is the creator_id corresponding to the post, please help me to provide all
    // info that require current user (A) to see about the creator user (B) in here
    // please note if the statues between these two users are A following B, all B post should
    // also return to A

    console.log('the following is the id for this profile')
    console.log(id)
    const handleFollowerClick = () => {
        console.log('Trying to get follower list')
        window.location.href = 'profile/follower_list'
    }

    const handleFollowingClick = () => {
        window.location.href = 'profile/following_list'
    }

    const formik = useFormik({
        onSubmit: async (values, helpers) => {
            helpers.setStatus({ success: true })
            helpers.setSubmitting(false)
        },
    })

    if (isLoading) {
        // Render a loading message while the posts are being retrieved
        return <div>Loading posts...</div>
    }

    console.log('the following is others profile')
    console.log(othersProfileToDisplay)
    console.log('the following is the follow statue')
    console.log(followStatusToDisplay)

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
                                x s={12}
                                md={8}
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
                                                src={`http://localhost:5000/avatar_images/${othersProfileToDisplay.profile_photo}`}
                                                sx={{
                                                    height: 64,
                                                    width: 64,
                                                }}
                                            />
                                            <div sx={{ ml: 30 }}>
                                                <Button
                                                    color="primary"
                                                    size="small"
                                                    type="button"
                                                    variant="outlined"
                                                >
                                                    {followStatusToDisplay ===
                                                    'unfollowed' ? (
                                                        <p>Follow</p>
                                                    ) : (
                                                        <p>UnFollow</p>
                                                    )}
                                                </Button>
                                                {followStatusToDisplay ===
                                                'pending' ? (
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        component="p"
                                                    >
                                                        your request is still
                                                        pending
                                                    </Typography>
                                                ) : null}
                                            </div>
                                        </Stack>
                                        <Box sx={{ maxWidth: 600 }}>
                                            <Stack spacing={1}>
                                                <Typography variant="h4">
                                                    {
                                                        othersProfileToDisplay.username
                                                    }
                                                </Typography>
                                                <Typography variant="h6">
                                                    {
                                                        othersProfileToDisplay.email
                                                    }
                                                </Typography>
                                                <Typography variant="h6">
                                                    {
                                                        othersProfileToDisplay.college
                                                    }
                                                </Typography>
                                                <Typography variant="h6">
                                                    <SvgIcon>
                                                        <AiOutlineHeart />
                                                    </SvgIcon>
                                                    {
                                                        othersProfileToDisplay.interests
                                                    }
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <HiOutlineCake />
                                                    </SvgIcon>{' '}
                                                    {
                                                        othersProfileToDisplay.birthday
                                                    }
                                                </Typography>
                                                <Typography variant="h6">
                                                    Following{' '}
                                                    {
                                                        othersProfileToDisplay.num_of_following
                                                    }
                                                    Followers{' '}
                                                    {
                                                        othersProfileToDisplay.num_of_follower
                                                    }
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </form>
                                </Card>
                            </Grid>
                            {followStatusToDisplay === 'following' ? (
                                <PostTable
                                    count={othersPostToDisplay.length}
                                    items={othersPostToDisplay}
                                />
                            ) : null}
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default OtherProfilePage
