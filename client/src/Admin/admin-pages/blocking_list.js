import { useCallback, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Card, Container, Divider, Stack, Typography } from '@mui/material'
import { OrdersSearch } from 'src/Admin/admin-sections/orders/orders-search'
import { OrdersTable } from 'src/Admin/admin-sections/orders/orders-table'

//I need backend to provide the mail address(id) and the start & end date of the blocking user.
//You can refer to the examples already entered below,
//but of course I will replace them with real user data after you have provided me with the backend user data.

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

const Page = () => {
    const [mode, setMode] = useState('table')
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [isLoading, setIsLoading] = useState(true) // Add loading state

    const [blockingListToDisplay, setBlockingListToDisplay] = useState([])

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

    useEffect(() => {
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
                //const stauts = res.status // status. 'success' for a success operation
                const data = res.data
                //const message = res.message // Debug only
                setBlockingListToDisplay(data.block_list) // Array of {email,startAt,endAt}
                setIsLoading(false)
                // Example : for email1
                // const email1 = block_list[0].email
                // const startAt = block_list[0].startAt
                // const endAt = block_list[0].endAt
            })
    }, [])

    if (isLoading) {
        // Render a loading message while the posts are being retrieved
        return <div>Loading posts...</div>
    }

    return (
        <>
            <Helmet>
                <title>Blocking List</title>
            </Helmet>
            {/*<h1>{block_list.length}</h1>*/}
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
                            <Typography variant="h4">Blocking List</Typography>
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
                                    count={blockingListToDisplay.length}
                                    items={blockingListToDisplay}
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
