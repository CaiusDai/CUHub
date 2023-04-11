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
        const itemIndex = items.findIndex((post) => post.id === commentId)

        // Create a copy of the items array
        const updatedPosts = [...items]

        // Update the name property of the relevant item object
        updatedPosts[itemIndex].NotCommenting =
            !updatedPosts[itemIndex].NotCommenting

        setIsCommentClicked(updatedPosts)
    }

    const handleSubmit = (e, postId) => {
        e.preventDefault()
        const commentInput = e.target.elements.commentInput
        console.log(
            `Submitted comment ${commentInput.value} for post ${postId}`
        )

        // TODO: Implement logic to add comment to the relevant post
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
                        {items.map((post) => {
                            return (
                                <TableRow key={post.id}>
                                    <TableCell>
                                        <Avatar
                                            src={post.authorAvatar}
                                            alt={post.authorName}
                                        />
                                        <Card variant="outlined">
                                            <CardHeader
                                                title={post.id}
                                                subheader={`post category`}
                                            />
                                            <CardContent>
                                                <Typography>
                                                    {post.content}
                                                </Typography>
                                            </CardContent>
                                            {post.image && (
                                                <CardMedia
                                                    component="img"
                                                    image={post.image}
                                                    alt={post.content}
                                                    sx={{ height: 200 }}
                                                />
                                            )}
                                            <CardActions>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="Comment"
                                                    onClick={() =>
                                                        handleCommentClick(
                                                            post.id
                                                        )
                                                    }
                                                >
                                                    <ChatIcon />
                                                </IconButton>
                                                {!post.NotCommenting && (
                                                    <form
                                                        onSubmit={(e) =>
                                                            handleSubmit(
                                                                e,
                                                                post.id
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
                                                                id={`commentInput${post.id}`}
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
