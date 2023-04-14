import { useCallback, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Card, Container, Divider, Stack, Typography } from '@mui/material'
import { PostTable } from 'src/Homepage/homepage-sections/post-table'
import NewAnnouncementForm from '../admin-components/new_announcement'

const AdminHomePage = () => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [isLoading, setIsLoading] = useState(true) // Add loading state

    const [postToDisplay, setPostToDisplay] = useState([]) // Use state instead of a variable

    const handleChangePage = useCallback((event, value) => {
        setPage(value)
    }, [])

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }, [])

    useEffect(() => {
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
                    console.log(errorCode)
                    // Do something
                } else if (status === 'error') {
                    // Wrong fetch format
                    const message = result.message
                    console.log(message)
                } else {
                    const data = result.data
                    console.log('the following is post for main page')
                    console.log(result.data)
                    setPostToDisplay(data.posts) // Update postToDisplay using the state setter
                    setIsLoading(false) // Set loading state to false
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
    }, []) // Empty dependency array to run the effect only once when the component mounts

    if (isLoading) {
        // Render a loading message while the posts are being retrieved
        return <div>Loading posts...</div>
    }
    // console.log("the following is post for main page")
    // console.log(postToDisplay)
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
                            <NewAnnouncementForm />
                            <Card>
                                <Divider />
                                <PostTable
                                    count={postToDisplay.length}
                                    items={postToDisplay}
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

export default AdminHomePage
