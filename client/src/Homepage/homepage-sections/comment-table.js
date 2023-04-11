import PropTypes from 'prop-types'
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    Typography,
    TextField,
} from '@mui/material'
import { Scrollbar } from 'src/Admin/admin-components/scrollbar'
import ChatIcon from '@mui/icons-material/Chat'
import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send'

export const CommentTable = (props) => {
    // const [isCommentClicked, setIsCommentClicked] = useState(false);

    const {
        count = 0,
        items = [],
        onPageChange = () => {},
        page = 0,
        rowsPerPage = 0,
        onRowsPerPageChange,
    } = props
    const [setIsCommentClicked] = useState(items)
    const handleCommentClick = (commentId) => {
        // TODO: Implement logic to navigate to the comments section of a post
        console.log(`Navigated to comments section of post ${commentId}`)
        const itemIndex = items.findIndex((comment) => comment.id === commentId)

        // Create a copy of the items array
        const updatedPosts = [...items]

        // Update the name property of the relevant item object
        updatedPosts[itemIndex].NotCommenting =
            !updatedPosts[itemIndex].NotCommenting

        setIsCommentClicked(updatedPosts)
    }

    const handleSubmit = (e, commentId) => {
        e.preventDefault()
        const commentInput = e.target.elements.commentInput
        console.log(
            `Submitted comment ${commentInput.value} for comment ${commentId}`
        )

        

        // handle create a comment for a particular comment here, currently, frontend can only consider text comment
        // , the input to backend is : commentInput (the text input
        // from the user), commentId (id for the comment which the new comment belongs to)
        // update backend post db, comment db correspondingly,
        // no explicit return value is needed in frontend
        commentInput.value = ''
    }

    return (
        <div>
            <Scrollbar>
                <Table
                    sx={{
                        minWidth: 500,
                        width: '100%',
                    }}
                >
                    <TableBody>
                        {items.map((comment) => {
                            return (
                                <TableRow key={comment.id}>
                                    <TableCell>
                                        <Avatar
                                            src={comment.authorAvatar}
                                            alt={comment.authorName}
                                        />
                                        <Card variant="outlined">
                                            <CardHeader
                                                title={comment.id}
                                                subheader={`post category`}
                                            />
                                            <CardContent>
                                                <Typography>
                                                    {comment.content}
                                                </Typography>
                                            </CardContent>
                                            {comment.image && (
                                                <CardMedia
                                                    component="img"
                                                    image={comment.image}
                                                    alt={comment.content}
                                                    sx={{ height: 200 }}
                                                />
                                            )}
                                            <CardActions>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="Comment"
                                                    onClick={() =>
                                                        handleCommentClick(
                                                            comment.id
                                                        )
                                                    }
                                                >
                                                    <ChatIcon />
                                                </IconButton>
                                                {!comment.NotCommenting && (
                                                    <form
                                                        onSubmit={(e) =>
                                                            handleSubmit(
                                                                e,
                                                                comment.id
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection:
                                                                    'row',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                        >
                                                            <TextField
                                                                id={`commentInput${comment.id}`}
                                                                name="commentInput"
                                                                variant="outlined"
                                                                placeholder="Type your comment here"
                                                                fullWidth
                                                                margin="normal"
                                                            />
                                                            <IconButton
                                                                type="submit"
                                                                aria-label="send"
                                                            >
                                                                <SendIcon />
                                                            </IconButton>
                                                        </div>
                                                    </form>
                                                )}
                                            </CardActions>
                                        </Card>
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

CommentTable.propTypes = {
    items: PropTypes.array,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
}
