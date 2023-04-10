import { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { subDays } from 'date-fns'
import { Box, Card, Container, Divider, Stack, Typography } from '@mui/material'
import { OrdersSearch } from 'src/Admin/admin-sections/orders_2/orders-search'
import { OrdersTable } from 'src/Admin/admin-sections/orders_2/orders-table'

const now = new Date()

//I need backend to provide the mail address(id) and the start & end date of the blocking user.
//You can look at blocking_list.js first.
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
const orders = [
    {
        id: 'usermail@gmail.com',
        createdAt: subDays(now, 21).getTime(),
        status: 'delivered',
        updatedAt: subDays(now, 7).getTime(),
    },
    {
        id: '9265@xxx',
        createdAt: subDays(now, 56).getTime(),
        status: 'complete',
        updatedAt: subDays(now, 54).getTime(),
    },
    {
        id: '9266',
        createdAt: subDays(now, 31).getTime(),
        status: 'placed',
        updatedAt: subDays(now, 43).getTime(),
    },
    {
        id: '1090',
        createdAt: subDays(now, 51).getTime(),
        status: 'processed',
        updatedAt: subDays(now, 13).getTime(),
    },
    {
        id: '1111',
        createdAt: subDays(now, 6).getTime(),
        status: 'processed',
        updatedAt: subDays(now, 54).getTime(),
    },
    // {
    //     id: '2475',
    //     createdAt: subDays(now, 17).getTime(),
    //     status: 'complete',
    //     updatedAt: subDays(now, 1).getTime(),
    // },
]

const Page = () => {
    const [mode, setMode] = useState('table')
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleModeChange = useCallback((event, value) => {
        if (value) {
            setMode(value)
        }
    }, [])

    const handleQueryChange = useCallback((value) => {
        setQuery(value)
    }, [])

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
                <title>All Accounts List</title>
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
                            <Typography variant="h4">
                                All Accounts List
                            </Typography>
                        </Stack>
                        <div>
                            <Card>
                                <OrdersSearch
                                    mode={mode}
                                    onModeChange={handleModeChange}
                                    onQueryChange={handleQueryChange}
                                    query={query}
                                />
                                <Divider />
                                <OrdersTable
                                    count={orders.length}
                                    items={orders}
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

export default Page
