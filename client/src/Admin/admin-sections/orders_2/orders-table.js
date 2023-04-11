import PropTypes from 'prop-types'
import {
    Divider,
    Link,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Button,
} from '@mui/material'
import { Scrollbar } from 'src/Admin/admin-components/scrollbar'
import { useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const OrdersTable = (props) => {
    const {
        count = 0,
        items = [],
        onPageChange = () => {},
        page = 0,
        rowsPerPage = 0,
        onRowsPerPageChange,
    } = props

    const navigate = useNavigate()

    const handleBlockClick = (user_email) => {
        console.log(`Navigated to block section of the account ${user_email}`)
        navigate(`/admin/block_setting/${user_email}`)
        // window.location.href = {'/homepage/particular_post/${postId}'}
    }
    const handleViewinfoClick = (user_email) => {
        console.log(
            `Navigated to view_info section of the account ${user_email}`
        )
        navigate(`/admin/view_info/${user_email}`)
        // window.location.href = {'/homepage/particular_post/${postId}'}
    }
    const handleDeleteClick = (user_email) => {
        console.log(`Navigated to delete section of the account ${user_email}`)
        navigate(`/admin/deleteconfirm/${user_email}`)
        // window.location.href = {'/homepage/particular_post/${postId}'}
    }
    return (
        <div>
            {/*<h1>{count}</h1>*/}
            <Scrollbar>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Mail Address</TableCell>
                            <TableCell>Personal Information</TableCell>
                            <TableCell>Block the Account</TableCell>
                            <TableCell>Delete the Account</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((user_list) => {
                            return (
                                <TableRow key={user_list.email}>
                                    <TableCell>
                                        <Link
                                            color="inherit"
                                            underline="none"
                                            variant="subtitle2"
                                        >
                                            {user_list.email}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            size="large"
                                            variant="contained"
                                            onClick={() =>
                                                handleViewinfoClick(
                                                    user_list.email
                                                )
                                            }
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            size="large"
                                            variant="contained"
                                            onClick={() =>
                                                handleBlockClick(
                                                    user_list.email
                                                )
                                            }
                                        >
                                            Block
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            size="large"
                                            variant="contained"
                                            onClick={() =>
                                                handleDeleteClick(
                                                    user_list.email
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
            <Divider />
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </div>
    )
}

OrdersTable.propTypes = {
    items: PropTypes.array,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
}
