import { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { subDays } from 'date-fns'
import { Box, Card, Container, Divider, Stack, Typography } from '@mui/material'
import { PostTable } from 'src/Homepage/homepage-sections/post-table'

const now = new Date()

// in this part, there is no input form the frontend,
// posts form people the user following need to be returned from backend for further use
const from_backend = () => {
    fetch('http://localhost:5000/api/posts/friends', {
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
                const posts = data.posts // Array of post
                //Each post will have following fields:
                // is_repost:
                // repost_content: the content written by who reposted the post
                // repost_creator_username:
                // post_id:
                // content: post content,
                // creation_time: the creation time for the post/repost
                // num_likes:
                // num_dislikes:
                // num_retweets:
                // num_comments:
                // creator_username: the creator of the post(or the original post)
                // tag:
                // is_liked:
                // is_disliked:
                // is_retweeted:
                // Do something
            }
        })
        .catch((error) => {
            console.error("Error fetching friends' posts:", error)
        })
}
const following_posts = [
    {
        id: 'usermail@gmail.com',
        isLiked: true,
        content: 'this is post 1',
    },
    {
        id: '9265@xxx',
        createdAt: subDays(now, 56).getTime(),
        status: 'complete',
        updatedAt: subDays(now, 54).getTime(),
        isLiked: false,
    },
    {
        id: '9266',
        createdAt: subDays(now, 31).getTime(),
        status: 'placed',
        updatedAt: subDays(now, 43).getTime(),
        isLiked: true,
    },
    {
        id: '1090',
        createdAt: subDays(now, 51).getTime(),
        status: 'processed',
        updatedAt: subDays(now, 13).getTime(),
        isLiked: true,
    },
    {
        id: '1111',
        createdAt: subDays(now, 6).getTime(),
        status: 'processed',
        updatedAt: subDays(now, 54).getTime(),
        isLiked: true,
    },
]

const FriendsPost = () => {
    // const [setMode] = useState('table')
    // const [setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    // const handleModeChange = useCallback((event, value) => {
    //   if (value) {
    //     setMode(value)
    //   }
    // }, [])

    // const handleQueryChange = useCallback((value) => {
    //   setQuery(value)
    // }, [])

    const handleChangePage = useCallback((event, value) => {
        setPage(value)
    }, [])

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }, [])

    return (
        <>
            <Helmet>
                <title>Friends Post</title>
            </Helmet>
            <Box
                sx={{
                    flexGrow: 1,
                    py: 4,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={1}>
                        <Stack
                            alignItems="flex-start"
                            direction="row"
                            justifyContent="space-between"
                            spacing={3}
                        >
                            <Typography variant="h4">Friends Post</Typography>
                        </Stack>
                        <div>
                            <Card>
                                <Divider />
                                <PostTable
                                    count={following_posts.length}
                                    items={following_posts}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                />
                            </Card>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default FriendsPost