import PropTypes from 'prop-types'
import { format } from 'date-fns'
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
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Unblock</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((order) => {
                            const startDate = format(
                                order.createdAt,
                                'MMM.dd yyyy'
                            )
                            const endDate = format(
                                order.updatedAt,
                                'MMM.dd yyyy'
                            )
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
                                        <Typography
                                            color="inherit"
                                            variant="inherit"
                                        >
                                            {startDate}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{endDate}</TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            appearance="blue"
                                            size="large"
                                            variant="contained"
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
