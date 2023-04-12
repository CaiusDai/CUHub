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
import { useNavigate } from 'react-router-dom'

export const PostTable = (props) => {
    const navigate = useNavigate()
    const {
        count = 0,
        items = [],
        onPageChange = () => {},
        page = 0,
        rowsPerPage = 0,
        onRowsPerPageChange,
    } = props
    const [posts, setPosts] = useState(items)
    const handleLikeClick = (postId) => {
        const itemIndex = posts.findIndex((post) => post.id === postId)

        // Create a copy of the items array
        const updatedPosts = [...posts]

        fetch(
            `http://localhost:5000/api/posts/like`,
            {
                method: 'POST',
                body: {post_id: postId},
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 'success')
                {
                    //The current status is liked
                    if(data.data.result === 'liked')
                    {}
                    //The current status is canceled, the current user have no altitude on the post
                    else if (data.data.result === 'canceled')
                    {}
                    
                }
                else
                {
                    //Something error in query
                }
            })

        // please do not change any code in this part and handle the like info update to backend
        // . The Input for the backend is stored in postId, the update policy is depend on
        // the isliked property, you can check it by updatedPosts[itemIndex].isLiked or your data in
        // server. When it is originally false, plus the counter by one and set it to true. when it is
        // originally true, do a cancel like work, no implicit return is needed.

        // Update the name property of the relevant item object
        updatedPosts[itemIndex].isLiked = !updatedPosts[itemIndex].isLiked

        // Update the state with the updated items array
        setPosts(updatedPosts)
    }

    const handleRepostClick = (postId) => {
        const itemIndex = posts.findIndex((post) => post.id === postId)

        // Create a copy of the items array
        const updatedPosts = [...posts]

        //Interface from back-end
        const parameters = {post_id: postId}

        fetch(
            `http://localhost:5000/api/posts/repost`,
            {
                method: 'POST',
                body: JSON.stringify(parameters),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 'success')
                {
                    //The current status is liked
                    if(data.data.result === 'reposted')
                    {}
                    //The current status is canceled, the current user have no altitude on the post
                    else if (data.data.result === 'canceled')
                    {}
                    
                }
                else
                {
                    //Something error in query
                }
            })
        // please do not change any code in this part and handle the repost info update to backend
        // . The Input for the backend is stored in postId, the update policy is depend on
        // the isRepost property, you can check it by updatedPosts[itemIndex].reposted or your data in
        // server. When it is originally false, plus the counter by one and set it to true, update post db.
        // correspondingly, when it is true, do cancel repost job. no implicit return is needed.

        // Update the name property of the relevant item object
        updatedPosts[itemIndex].reposted = !updatedPosts[itemIndex].reposted

        // Update the state with the updated items array
        setPosts(updatedPosts)
    }

    const handleCommentClick = (postId) => {
        // TODO: Implement logic to navigate to the comments section of a post
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
                                <TableRow key={post.post_id}>
                                    <TableCell>
                                        <Avatar
                                            src={post.authorAvatar}
                                            alt={post.authorName}
                                        />
                                        <Card variant="outlined">
                                            <CardHeader
                                                title={post.creator_name}
                                                subheader={post.tag}
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
                                                    color="default"
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
