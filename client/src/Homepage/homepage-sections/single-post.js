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
    TableRow,
    Typography,
} from '@mui/material'
import { Scrollbar } from 'src/Admin/admin-components/scrollbar'
import FavoriteIcon from '@mui/icons-material/Favorite'
import RepeatIcon from '@mui/icons-material/Repeat'
import ChatIcon from '@mui/icons-material/Chat'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SinglePost = (props) => {
    const navigate = useNavigate()
    const { items = [] } = props
    const [posts, setPosts] = useState(items)
    const handleLikeClick = (postId) => {
        const itemIndex = posts.findIndex((post) => post.id === postId)

        // Create a copy of the items array
        const updatedPosts = [...posts]

        // Update the name property of the relevant item object
        updatedPosts[itemIndex].isLiked = !updatedPosts[itemIndex].isLiked

        // Update the state with the updated items array
        setPosts(updatedPosts)
    }

    const handleRepostClick = (postId) => {
        const itemIndex = posts.findIndex((post) => post.id === postId)

        // Create a copy of the items array
        const updatedPosts = [...posts]

        // Update the name property of the relevant item object
        updatedPosts[itemIndex].reposted = !updatedPosts[itemIndex].reposted

        // Update the state with the updated items array
        setPosts(updatedPosts)
    }

    const handleCommentClick = (postId) => {
        console.log(`Navigated to comments section of post ${postId}`)
        navigate(`/homepage/particular_post/${postId}`)
        // window.location.href = {'/homepage/particular_post/${postId}'}
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
                                                    color={
                                                        post.reposted
                                                            ? 'primary'
                                                            : 'default'
                                                    }
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
        </div>
    )
}

SinglePost.propTypes = {
    items: PropTypes.array,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
}
