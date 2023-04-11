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
    Typography,
    Button,
} from '@mui/material'
import { Scrollbar } from 'src/Admin/admin-components/scrollbar'
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
    
    const handleUnblockClick = (user_email) => {
        console.log(`Navigated to unblock section of the account ${user_email}`)
        navigate(`/admin/block_setting/${user_email}`)
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
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Unblock</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((block_list) => {
                            return (
                                <TableRow key={block_list.email}>
                                    <TableCell>
                                        <Link
                                            color="inherit"
                                            underline="none"
                                            variant="subtitle2"
                                        >
                                            {block_list.email}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            color="inherit"
                                            variant="inherit"
                                        >
                                            {block_list.startAt}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{block_list.endAt}</TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            appearance="blue"
                                            size="large"
                                            variant="contained"
                                            onClick={() =>
                                                handleUnblockClick(
                                                    block_list.email
                                                )
                                            }
                                        >
                                            Unblock
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
