const express = require('express')
const { connect_db } = require('../../configs/db')
const config = require('../../configs/configs')
const util = require('../../util/utils')
const HTTPCode = config.HTTPCode
const post_router = express.Router()
const comment_router = express.Router()

post_router.use('/comments', comment_router)

// Get all posts
post_router.get('/all', (req, res) => {
    // Check identity:
    if (!req.session.isAuthenticated) {
        res.status(HTTPCode.Unauthorized).json({
            status: 'fail',
            data: {
                error_code: config.ErrorCodes.Unauthorized,
            },
            message: 'Unauthenticated visit',
        })
        return
    }
    const user_id = req.session.uid
    // Content CreationTime num_likes num_dislikes Post
    const query = `SELECT p.post_id, p.content, p.creation_time, p.num_like, p.num_dislike,
                    p.num_retweet, p.num_comment, p.is_anonymous, p.tags,
                    a.username AS creator, a.user_id AS creator_id,
                    EXISTS(SELECT 1 FROM PostAltitude WHERE user_id = ${user_id} AND post_id = p.post_id AND status = 'like') AS liked_by_user,
                    EXISTS(SELECT 1 FROM PostAltitude WHERE user_id = ${user_id} AND post_id = p.post_id AND status = 'dislike') AS disliked_by_user
                    FROM Post p
                    JOIN Account a ON p.user_id = a.user_id
                    WHERE p.is_public = true AND p.is_draft = false
                    ORDER BY p.creation_time DESC`
    connect_db()
        .then((database) => database.query(query))
        .then((db_result) => {
            const posts = db_result.rows.map((post) => {
                return {
                    post_id: post.post_id,
                    content: post.content,
                    creation_time: util.format_date(post.creation_time),
                    num_like: post.num_like,
                    num_dislike: post.num_dislike,
                    num_retweet: post.num_retweet,
                    num_comment: post.num_comment,
                    is_anonymous: post.is_anonymous,
                    tag: post.tags,
                    creator_name: post.creator,
                    creator_id: post.creator_id,
                    liked_by_user: post.liked_by_user,
                    disliked_by_user: post.disliked_by_user,
                }
            })
            res.status(HTTPCode.Ok).json({
                status: 'success',
                data: {
                    posts: posts,
                },
                message: '[INFO] Sent all posts already',
            })
        })
        .catch((err) => {
            console.error(`[Error] Failed to send posts.\n Error: ${err}`)
            res.status(HTTPCode.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })
        })
})

// Get all Firends' Post
post_router.get('/friends', (req, res) => {
    // Check identity:
    if (!req.session.isAuthenticated) {
        res.status(HTTPCode.Unauthorized).json({
            status: 'fail',
            data: {
                error_code: config.ErrorCodes.Unauthorized,
            },
            message: 'Unauthenticated visit',
        })
        return
    }
    const user_id = req.session.uid
    // Content CreationTime num_likes num_dislikes Post
    const query = `WITH OriginalPosts AS (
        SELECT 
          p.post_id, 
          p.content, 
          p.creation_time, 
          p.num_like, 
          p.num_dislike, 
          p.num_retweet, 
          p.num_comment, 
          NULL AS repost_creator_username, 
          a.username AS creator_username, 
          p.tags, 
          false AS is_repost, 
          NULL AS repost_content,
          false AS retweeted_by_user
        FROM 
          Post AS p 
          JOIN Account AS a ON a.user_id = p.user_id 
          LEFT JOIN (
            SELECT 
              user2 
            FROM 
              FollowRelationship 
            WHERE 
              user1 = ${user_id} AND status = true
            UNION 
            SELECT 
            ${user_id} AS user2
          ) AS f ON p.user_id = f.user2 
        WHERE 
          p.is_draft = false 
        UNION 
        SELECT 
          p.post_id, 
          p.content AS content, 
          r.creation_time AS creation_time, 
          p.num_like, 
          p.num_dislike, 
          p.num_retweet, 
          p.num_comment, 
          a2.username AS repost_creator_username, 
          a.username AS creator_username, 
          p.tags, 
          true AS is_repost, 
          r.comment AS repost_content,
          r.user_id = ${user_id} AS retweeted_by_user
        FROM 
          Post AS p 
          JOIN Repost AS r ON r.original_post_id = p.post_id 
          JOIN Account AS a ON a.user_id = p.user_id 
          JOIN Account AS a2 ON a2.user_id = r.user_id 
          JOIN (
            SELECT 
              user2 
            FROM 
              FollowRelationship 
            WHERE 
              user1 = ${user_id} AND status = true
            UNION 
            SELECT 
            ${user_id} AS user_id
          ) AS f ON (p.user_id = f.user2 OR r.user_id = f.user2)
        WHERE 
          p.is_draft = false 
    )
    SELECT 
      op.post_id, 
      op.content, 
      op.creation_time, 
      op.num_like, 
      op.num_dislike, 
      op.num_retweet, 
      op.num_comment, 
      op.repost_creator_username, 
      op.creator_username, 
      op.tags, 
      op.is_repost, 
      op.repost_content, 
      COALESCE(pa.status = 'like', false) AS liked_by_user,
      COALESCE(pa.status = 'dislike', false) AS disliked_by_user,
      op.retweeted_by_user
    FROM 
      OriginalPosts AS op
      LEFT JOIN PostAltitude AS pa ON op.post_id = pa.post_id AND pa.user_id = ${user_id}
    ORDER BY 
      creation_time DESC
    `
    connect_db()
        .then((database) => database.query(query))
        .then((db_result) => {
            const posts = db_result.rows.map((post) => {
                return {
                    is_repost: post.is_repost,
                    repost_content: post.repost_content,
                    repost_creator_username: post.repost_creator_username,
                    post_id: post.post_id,
                    content: post.content,
                    creation_time: util.format_date(post.creation_time),
                    num_likes: post.num_like,
                    num_dislikes: post.num_dislike,
                    num_retweets: post.num_retweet,
                    num_comments: post.num_comment,
                    creator: post.creator,
                    creator_username: post.creator_username,
                    tag: post.tags,
                    is_liked: post.liked_by_user,
                    is_disliked: post.disliked_by_user,
                    is_retweeted: post.retweeted_by_user,
                }
            })
            res.status(HTTPCode.Ok).json({
                status: 'success',
                data: {
                    posts: posts,
                },
                message: "[INFO] Sent all friends' posts already",
            })
        })
        .catch((err) => {
            console.error(`[Error] Failed to send posts.\n Error: ${err}`)
            res.status(HTTPCode.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })
        })
})

// Create new Post
post_router.post('/new', (req, res) => {
    // Check identity:
    if (!req.session.isAuthenticated || req.session.isAdmin) {
        const error_code = req.session.isAuthenticated
            ? config.ErrorCodes.InvalidAccess
            : config.ErrorCodes.NotAuthenticated
        res.status(HTTPCode.Unauthorized).json({
            status: 'fail',
            data: {
                error_code: error_code,
            },
            message:
                'Post can only be created by normal users that have signed in',
        })
        return
    }
    const user_id = req.session.uid
    console.log(req.body)
    const { postContent, tagChoices } = req.body
    const is_public = true
    const is_anonymous = false
    const is_draft = false
    const query = `INSERT INTO Post (user_id, content, is_public, is_anonymous, tags,is_draft)
                   VALUES (${user_id}, '${postContent}', ${is_public}, ${is_anonymous}, '${tagChoices}',${is_draft})
                   RETURNING post_id`
    console.log(query)
    connect_db()
        .then((database) => database.query(query))
        .then(() => {
            res.status(config.HTTPCode.Ok).json({
                status: 'success',
                data: {
                    is_success: true,
                },
                message: 'Post Created',
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(config.HTTPCode.BadRequest).json({
                status: 'error',
                message: 'Wrong query format',
            })
        })
})

module.exports = post_router
