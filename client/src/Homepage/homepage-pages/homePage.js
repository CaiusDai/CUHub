import { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { subDays } from 'date-fns'
import { Box, Card, Container, Divider, Stack, Typography } from '@mui/material'
import { PostTable } from 'src/Homepage/homepage-sections/post-table'

import NewPostForm from '../homepage-components/new_post'

const now = new Date()

// in this part, there is no input form the frontend,
// all posts need to be returned from backend for further use
const from_backend = () => {
    fetch('http://localhost:5000/api/posts/all', {
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
                // post_id:
                // content:
                // creation_time: Date,Time
                // num_like:
                // num_dislike:
                // num_retweet:
                // num_comment:
                // is_anonymous:
                // tag:
                // creator_name: username
                // creator_id:
                // liked_by_user: boolean
                // disliked_by_user: boolean
                // Do something
            }
        })
        .catch((error) => {
            console.error('Error fetching all posts:', error)
        })
}
const posts = [
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

const Main = () => {
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
                <title>All Post</title>
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
                            <Typography variant="h4">All Post</Typography>
                        </Stack>
                        <div>
                            <NewPostForm />
                            <Card>
                                <Divider />
                                <PostTable
                                    count={posts.length}
                                    items={posts}
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

export default Main
