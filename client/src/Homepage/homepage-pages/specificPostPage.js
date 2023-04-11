import { useCallback, useState } from 'react'
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
const post_comments = [
    {
        id: 'usermail@gmail.com',
        NotCommenting: true,
        content: 'this is comment 1',
        reposted: false,
    },
    {
        id: '9265@xxx',
        createdAt: subDays(now, 56).getTime(),
        status: 'complete',
        updatedAt: subDays(now, 54).getTime(),
        NotCommenting: true,
        reposted: false,
    },
    {
        id: '9266',
        createdAt: subDays(now, 31).getTime(),
        status: 'placed',
        updatedAt: subDays(now, 43).getTime(),
        NotCommenting: true,
        reposted: false,
    },
    {
        id: '1090',
        createdAt: subDays(now, 51).getTime(),
        status: 'processed',
        updatedAt: subDays(now, 13).getTime(),
        NotCommenting: true,
        reposted: false,
    },
    {
        id: '1111',
        createdAt: subDays(now, 6).getTime(),
        status: 'processed',
        updatedAt: subDays(now, 54).getTime(),
        NotCommenting: true,
        reposted: false,
    },
]
const SpecificPostPage = () => {
    const { id } = useParams()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    console.log('the following is id for the page')
    console.log(id)
    // with a particular id, I hope to get info about the post and render it here,
    // the following is an example corresponding to the id above
    const post = [
        {
            id: 'usermail@gmail.com',
            isLiked: true,
            content: 'this is post content',
            reposted: false,
        },
    ]

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
                                    count={post.length}
                                    items={post}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                />
                            </Card>
                            <NewCommentForm />
                            <Card>
                                <Divider />
                                <CommentTable
                                    count={post_comments.length}
                                    items={post_comments}
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
