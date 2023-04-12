import { useCallback, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { subDays } from 'date-fns'
import { Box, Card, Container, Divider, Stack, Typography } from '@mui/material'
import { CommentTable } from '../homepage-sections/comment-table'
import NewCommentForm from '../homepage-components/new_comment'
import { useParams } from 'react-router-dom'
import { SinglePost } from '../homepage-sections/single-post'
const now = new Date()

// in this part, there is no input form the frontend,
// posts form people the user following need to be returned from backend for further use

const SpecificPostPage = () => {
    const { id } = useParams()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [isLoading, setIsLoading] = useState(true)
    const [postToDisplay, setPostToDisplay] = useState([])
    const [commentToDisplay, setCommentToDisplay] = useState([])
    /* After clicking the comment button, the user will enter a page for a specific page
     *  frontend will request original content and corresponding comment and render it
     *  here, the id property stand the original post id, and it is the input from frontend
     *  post corresponding to this post id, and all comments related to this post is needed
     *  you can take the post and post_comment variable above as an example*/

    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/comments/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    //Success
                    const results = data.data.result_list //The post conetens and the comments are in the results
                    const post = results.post //The post contents
                    setPostToDisplay(results.post)
                    //Retrieve the post contents using the format: post.user_id, post.content, post.creation_time .... The attributes name is same as the name in db_create of profile

                    const comment_list = results.comments //The list of comments, ordered by comment_id
                    setCommentToDisplay(results.comments)
                    //comment_list is an array, each element is an object of comment, use it in the format: comment_list[0].content, comment_list[1].content, comment_list[2].reply_to ...
                    //the attributes name is also the same as the db_create of comments
                    setIsLoading(false)
                } else {
                    //Something error in query or reply to himself
                    console.log(data.message)
                }
            })
    }, [])

    const handleChangePage = useCallback((event, value) => {
        setPage(value)
    }, [])

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }, [])

    if (isLoading) {
        // Render a loading message while the posts are being retrieved
        return <div>Loading posts...</div>
    }
    return (
        <>
            <Helmet>
                <title>comment on post</title>
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
                            <Typography variant="h4">Comments</Typography>
                        </Stack>
                        <div>
                            <Card>
                                <Divider />
                                <SinglePost
                                    count={[postToDisplay].length}
                                    items={[postToDisplay]}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                />
                            </Card>
                            <NewCommentForm postId={id} />
                            <Card>
                                <Divider />
                                <CommentTable
                                    count={commentToDisplay.length}
                                    items={commentToDisplay}
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

export default SpecificPostPage
