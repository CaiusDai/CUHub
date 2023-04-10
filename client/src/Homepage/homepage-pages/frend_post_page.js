import { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { subDays } from 'date-fns'
import { Box, Card, Container, Divider, Stack, Typography } from '@mui/material'
<<<<<<<< HEAD:client/src/Admin/admin-pages/blocking_list.js
import { OrdersSearch } from 'src/Admin/admin-sections/orders/orders-search'
import { OrdersTable } from 'src/Admin/admin-sections/orders/orders-table'

const now = new Date()

//I need backend to provide the mail address(id) and the start & end date of the blocking user.
//You can refer to the examples already entered below,
//but of course I will replace them with real user data after you have provided me with the backend user data.
const orders = [
    fetch(`http://localhost:5000/api/admin/block/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then((response) => response.json())
        .then((res) => {
            // Format of resposne:
            const stauts = res.status // status. 'success' for a success operation
            const data = res.data
            const message = res.message // Debug only
            const block_list = data.block_list // Array of {email,startAt,endAt}
            // Example : for email1
            const email1 = block_list[0].email
            const startAt = block_list[0].startAt
            const endAt = block_list[0].endAt
            console.log(block_list)
        }),
    // {
    //     id: 'usermail@gmail.com',
    //     createdAt: subDays(now, 21).getTime(),
    //     updatedAt: subDays(now, 7).getTime(),
    // },
    // {
    //     id: '9265@xxx',
    //     createdAt: subDays(now, 56).getTime(),
    //     status: 'complete',
    //     updatedAt: subDays(now, 54).getTime(),
    // },
    // {
    //     id: '9266',
    //     createdAt: subDays(now, 31).getTime(),
    //     status: 'placed',
    //     updatedAt: subDays(now, 43).getTime(),
    // },
    // {
    //     id: '1090',
    //     createdAt: subDays(now, 51).getTime(),
    //     status: 'processed',
    //     updatedAt: subDays(now, 13).getTime(),
    // },
    // {
    //     id: '1111',
    //     createdAt: subDays(now, 6).getTime(),
    //     status: 'processed',
    //     updatedAt: subDays(now, 54).getTime(),
    // },
    // {
    //     id: '2475',
    //     createdAt: subDays(now, 17).getTime(),
    //     status: 'complete',
    //     updatedAt: subDays(now, 1).getTime(),
    // },
========
import { PostTable } from 'src/Homepage/homepage-sections/post-table'

const now = new Date()

// in this part, there is no input form the frontend,
// posts form people the user following need to be returned from backend for further use
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
>>>>>>>> 908af2342ae3264ab0f5582f2f837ba14648912e:client/src/Homepage/homepage-pages/frend_post_page.js
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
