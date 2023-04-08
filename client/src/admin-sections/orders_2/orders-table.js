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
import { Scrollbar } from 'src/admin-components/scrollbar'

export const OrdersTable = (props) => {
    const {
        count = 0,
        items = [],
        onPageChange = () => {},
        page = 0,
        rowsPerPage = 0,
        onRowsPerPageChange,
    } = props

    return (
        <div>
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
                        {items.map((order) => {
                            return (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <Link
                                            color="inherit"
                                            href="#"
                                            underline="none"
                                            variant="subtitle2"
                                        >
                                            {order.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            size="large"
                                            variant="contained"
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            size="large"
                                            variant="contained"
                                        >
                                            Block
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            size="large"
                                            variant="contained"
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
