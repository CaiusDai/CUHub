const express = require('express')
const config = require('../configs/configs')

const { connect_db } = require('../configs/db.js')

const util = require('../util/utils')
const HTTPCodes = config.HTTPCode
const profile_router = express.Router()

// //Create instance of bodyParser
// const jsonParser = bodyParser.json()
// profile_router.use(jsonParser)

//Get personal profile, no input needed
profile_router.get('/me', (req, res) => {
    if (!req.session.isAuthenticated) {
        res.status(HTTPCodes.Unauthorized).json({
            status: 'fail',
            data: {
                error_code: config.ErrorCodes.Unauthorized,
            },
            message: 'Unauthenticated visit',
        })
        return
    }

    const user_id = req.session.uid

    const query_get_profile = `SELECT username,major,gender,TO_CHAR(birthday,'yyyy-mm-dd') AS birthday,
                                college,interests,email,profile_photo,num_of_follower,num_of_following
                                 FROM Profile,Account 
                                 WHERE Profile.user_id = Account.user_id
                                 AND Profile.user_id = ${user_id}`
    //Get username and photo
    connect_db()
        .then((database) => database.query(query_get_profile))
        .then((db_result) => {
            const result = db_result.rows[0]
            res.status(HTTPCodes.Ok).json({
                status: 'success',
                data: {
                    profile: result,
                },
                message: '[INFO] Successfully get profile',
            })
        })
        .catch((err) => {
            console.log(
                'Error in getting the profile of current user and the error is :',
                err
            )
            res.status(HTTPCodes.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })
        })
})

//Updating
profile_router.put('/', (req, res) => {
    if (!req.session.isAuthenticated) {
        res.status(HTTPCodes.Unauthorized).json({
            status: 'fail',
            data: {
                error_code: config.ErrorCodes.Unauthorized,
            },
            message: 'Unauthenticated visit',
        })
        return
    }

    const { username, major, gender, birthday, college, interests } = req.body
    console.log(major)
    console.log(gender)
    console.log(birthday)
    console.log(college)
    console.log(interests)
    console.log(username)
    // const profile_photo = req.body.profile_photo//Needs to be solved using the way of uploading photo
    const user_id = req.session.uid
    const query_edit_profile = `UPDATE Profile SET major = '${major}', gender = '${gender}',birthday = '${birthday}', college = '${college}',interests = ARRAY['${interests[0]}','${interests[1]}','${interests[2]}'] WHERE user_id = ${user_id}`
    connect_db()
        .then((database) => {
            database.query(query_edit_profile)
        })
        .catch((err) => {
            console.log(
                '[ERROR]: error in updating profile, the error is: ',
                err
            )
            res.status(HTTPCodes.BadRequest).json({
                status: 'fail',
                message: '[INFO] Fail to update profile',
            })
            return
        })

    res.status(HTTPCodes.Ok).json({
        status: 'success',
        message: '[INFO] Edit profile successfully',
    })
    //No data returned
})

//View other profile, need other's user_id
profile_router.get('/:user_id', async (req, res) => {
    if (!req.session.isAuthenticated) {
        res.status(HTTPCodes.Unauthorized).json({
            status: 'fail',
            data: {
                error_code: config.ErrorCodes.Unauthorized,
            },
            message: 'Unauthenticated visit',
        })
        return
    }

    try {
        const user_id = req.params.user_id
        const current_id = req.session.uid
        const database = await connect_db()

        //Get username and profile photo of this user
        const query_get_profile = `SELECT username,major,gender,TO_CHAR(birthday,'yyyy-mm-dd') AS birthday,
                                college,interests,email,profile_photo,num_of_follower,num_of_following
                                FROM Profile,Account 
                                WHERE Profile.user_id = Account.user_id
                                AND Profile.user_id = ${user_id}`

        //Get username and photo
        const db_result = await database.query(query_get_profile)
        const profile = db_result.rows[0]

        //Check condition to get post of other
        const query_check_valid = `SELECT status FROM FollowRelationship WHERE user1 =${current_id} AND user2 = ${user_id}`
        const db_status = await database.query(query_check_valid)

        if (db_status.rowCount === 0) {
            //No record, without sending posts back
            res.status(HTTPCodes.Ok).json({
                status: 'success',
                data: {
                    follow_status: 'unfollowed',
                    profile: profile,
                    posts: [],
                },
                message: '[INFO] Get profile successfully',
            })
        } else if (db_status.rows[0].status === false) {
            //Pending
            res.status(HTTPCodes.Ok).json({
                status: 'success',
                data: {
                    follow_status: 'pending',
                    profile: profile,
                    posts: [],
                },
                message: '[INFO] Get profile successfully',
            })
        } else if (db_status.rows[0].status === true) {
            //If current user is following the user
            const query_get_post = `WITH OriginalPosts AS (
                SELECT 
                  p.post_id, 
                  p.content, 
                  p.creation_time, 
                  p.num_like, 
                  p.num_dislike, 
                  p.num_retweet, 
                  p.num_comment, 
                  p.images,
                  NULL AS repost_creator_username, 
                  a.username AS creator_username, 
                  p.tags, 
                  false AS is_repost, 
                  NULL AS repost_content,
                  false AS retweeted_by_user,
                  pf.profile_photo AS avatar
                FROM 
                  Post AS p 
                  JOIN Account AS a ON a.user_id = p.user_id 
                  JOIN PROFILE AS pf ON pf.user_id = a.user_id
                WHERE 
                  p.is_draft = false 
                  AND a.user_id = ${user_id}
                UNION 
                SELECT 
                  p.post_id, 
                  p.content AS content, 
                  r.creation_time AS creation_time, 
                  p.num_like, 
                  p.num_dislike, 
                  p.num_retweet, 
                  p.num_comment, 
                  p.images,
                  a2.username AS repost_creator_username, 
                  a.username AS creator_username, 
                  p.tags, 
                  true AS is_repost, 
                  r.comment AS repost_content,
                  r.user_id = ${current_id} AS retweeted_by_user,
                  f.profile_photo AS avatar
                FROM 
                  Post AS p 
                  JOIN Repost AS r ON r.original_post_id = p.post_id 
                  JOIN Account AS a ON a.user_id = p.user_id 
                  JOIN Account AS a2 ON a2.user_id = r.user_id 
                  JOIN Profile AS f ON f.user_id = a2.user_id
                WHERE 
                  p.is_draft = false 
                  AND a2.user_id = ${user_id}
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
              op.creator_username AS creator, 
              op.tags, 
              op.is_repost, 
              op.repost_content, 
              COALESCE(pa.status = 'like', false) AS liked_by_user, 
              COALESCE(pa.status = 'dislike', false) AS disliked_by_user, 
              op.retweeted_by_user,
              op.avatar,
              op.images
            FROM 
              OriginalPosts AS op
              LEFT JOIN PostAltitude AS pa ON op.post_id = pa.post_id AND pa.user_id = ${current_id}
            ORDER BY 
              creation_time DESC
            
            ` //Unfinished
            const result_post = await database.query(query_get_post)
            const posts = result_post.rows.map((post) => {
                return {
                    is_repost: post.is_repost,
                    repost_content: post.repost_content,
                    repost_creator_username: post.repost_creator_username,
                    post_id: post.post_id,
                    content: post.content,
                    creation_time: util.format_date(post.creation_time),
                    num_like: post.num_like,
                    num_dislike: post.num_dislike,
                    num_retweet: post.num_retweet,
                    num_comment: post.num_comment,
                    creator_name: post.creator,
                    tag: post.tags,
                    is_liked: post.liked_by_user,
                    disliked_by_user: post.disliked_by_user,
                    is_retweeted: post.retweeted_by_user,
                    avatar: post.avatar,
                    images: post.images,
                }
            })
            res.status(HTTPCodes.Ok).json({
                status: 'success',
                data: {
                    follow_status: 'following',
                    profile: profile,
                    posts: posts,
                },
                message: '[INFO] Get profile successfully',
            })
        }
    } catch (err) {
        console.log(
            'Error in getting the profile of other user and the error is :',
            err
        )
        res.status(HTTPCodes.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
    }
})

// Get : Get the profile of oneself
// Post : Already created when a user sign up successfully
// Delete : NOT DEFINED
// Update : Edit the profile
// '/profiles/me/:id'

// Get : Get the profile of a user with <id>
// Others: NOT DEFINED
// '/profiles/owner/:id'

module.exports = profile_router
