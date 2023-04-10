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
} from '@mui/material'
import { Scrollbar } from 'src/Admin/admin-components/scrollbar'
import FavoriteIcon from '@mui/icons-material/Favorite'
import RepeatIcon from '@mui/icons-material/Repeat'
import ChatIcon from '@mui/icons-material/Chat'
import { useState } from 'react'

export const PostTable = (props) => {
    const {
        count = 0,
        items = [],
        onPageChange = () => {},
        page = 0,
        rowsPerPage = 0,
        onRowsPerPageChange,
    } = props
    const [isLiked, setIsLiked] = useState(props.isLiked)
    const handleLikeClick = (postId) => {
        setIsLiked(!isLiked)
        console.log(`Liked post ${postId}`)
    }

    const handleRepostClick = (postId) => {
        // TODO: Implement logic to repost a post
        console.log(`Reposted post ${postId}`)
    }

    const handleCommentClick = (postId) => {
        // TODO: Implement logic to navigate to the comments section of a post
        console.log(`Navigated to comments section of post ${postId}`)
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
                                                    color={
                                                        post.isLiked
                                                            ? 'default'
                                                            : 'primary'
                                                    }
                                                    aria-label="Like"
                                                    onClick={() =>
                                                        handleLikeClick(post.id)
                                                    }
                                                >
                                                    <FavoriteIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="Repost"
                                                    onClick={() =>
                                                        handleRepostClick(
                                                            post.id
                                                        )
                                                    }
                                                >
                                                    <RepeatIcon />
                                                </IconButton>
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

PostTable.propTypes = {
    items: PropTypes.array,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
}
