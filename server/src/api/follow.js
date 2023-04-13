const express = require('express')
const { connect_db } = require('../configs/db')
const config = require('../configs/configs')
const HTTPCode = config.HTTPCode
const follow_router = express.Router()

//Get all following users including pending
follow_router.get('/followinglist/me', async (req, res) => {
    //Check validity
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

    try {
        const user_id = req.session.uid
        const database = await connect_db()

        const query_get_followinglist = `SELECT * FROM Account,FollowRelationship WHERE Account.user_id = FollowRelationship.user2 AND FollowRelationship.user1 = ${user_id} ORDER BY (CASE WHEN FALSE THEN 0 ELSE 1 END) ASC`
        const db_result = await database.query(query_get_followinglist)

        //The user have no following user
        if (db_result.rowCount === 0) {
            res.status(HTTPCode.Ok).json({
                status: 'success',
                data: {
                    user_list: [],
                },
                message: '[INFO] You have no following user',
            })
            return
        }

        //The current user have at least one following user
        const user_list = db_result.rows.map((row) => {
            return {
                user_id: row.user2,
                username: row.username,
                email: row.email,
                status: row.status,
            }
        })

        res.status(HTTPCode.Ok).json({
            status: 'success',
            data: {
                user_list: user_list,
            },
            message: '[INFO] Sent all following user already',
        })
    } catch (err) {
        console.error(`[Error] Failed to send following list.\n Error: ${err}`)
        res.status(HTTPCode.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
    }
})

//Remove user from following list
follow_router.delete('/followinglist/:id', async (req, res) => {
    //Check validity
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

    try {
        const user_id = req.session.uid
        const following_id = req.params.id
        console.log(following_id)
        const database = await connect_db()

        const status = await database.query(
            `SELECT status FROM FollowRelationship WHERE user1 = ${user_id} AND user2 = ${following_id}`
        )

        //If there's no record of those two user
        if (status.rowCount === 0) {
            res.status(HTTPCode.BadRequest).json({
                status: 'error',
                message:
                    '[Error] You have not follow the user, can not remove him from your following list',
            })
            return
        }

        const query_remove_following = `DELETE FROM FollowRelationship WHERE user1 = ${user_id} AND user2 = ${following_id};UPDATE Profile SET num_of_follower = num_of_follower - 1 WHERE user_id = ${following_id};UPDATE Profile SET num_of_following = num_of_following - 1 WHERE user_id = ${user_id}`

        await database.query(query_remove_following)

        //The record is deleted

        res.status(HTTPCode.Ok).json({
            status: 'success',
            data: {},
            message: '[INFO] Remove user from following list success',
        })
    } catch (err) {
        console.error(
            `[Error] Failed to operate following list.\n Error: ${err}`
        )
        res.status(HTTPCode.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
    }
})
// Get : Get accounts who is being followed by user with <id>
// Post : NOT DEFINED
// Delete : Remove a user from following list
// Update : NOT DEFINED

// '/follows/followinglist/:id'

// // Get : Get accounts who is following user with <id>
// // Post : NOT DEFINED
// // Delete : Remove a follower
// // Update : NOT DEFINED
// '/follows/followerlist/:id'

//Get follower list
follow_router.get('/followerlist/me', async (req, res) => {
    //Check validity
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

    try {
        const user_id = req.session.uid
        const database = await connect_db()

        //Pending user
        const query_get_followinglist_pending = `SELECT * FROM Account,FollowRelationship WHERE Account.user_id = FollowRelationship.user1 AND FollowRelationship.user2 = ${user_id} AND FollowRelationship.status = FALSE`
        const db_result1 = await database.query(query_get_followinglist_pending)

        //Follower
        const query_get_followinglist_follower = `SELECT * FROM Account,FollowRelationship WHERE Account.user_id = FollowRelationship.user1 AND FollowRelationship.user2 = ${user_id} AND FollowRelationship.status = TRUE`
        const db_result2 = await database.query(
            query_get_followinglist_follower
        )

        if (db_result1.rowCount + db_result2.rowCount === 0) {
            req.status(HTTPCode.Ok).json({
                status: 'success',
                data: {
                    pending_list: [],
                    follower_list: [],
                },
                message: '[INFO] You have no follower or pending user',
            })
            return
        }

        //The pending user
        const user_list1 = db_result1.rows.map((row) => {
            return {
                user_id: row.user1,
                username: row.username,
                email: row.email,
                status: row.status,
            }
        })

        //The follower
        const user_list2 = db_result2.rows.map((row) => {
            return {
                user_id: row.user1,
                username: row.username,
                email: row.email,
                status: row.status,
            }
        })

        res.status(HTTPCode.Ok).json({
            status: 'success',
            data: {
                pending_list: user_list1,
                follower_list: user_list2,
            },
            message: '[INFO] Sent all follower already',
        })
    } catch (err) {
        console.error(`[Error] Failed to send follower list.\n Error: ${err}`)
        res.status(HTTPCode.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
    }
})

//Remove a user from your followerlist
follow_router.delete('/followerlist/:id', async (req, res) => {
    //Check validity
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

    try {
        const user_id = req.session.uid
        const follower_id = req.params.id
        const database = await connect_db()
        const status = await database.query(
            `SELECT status FROM FollowRelationship WHERE user1 = ${follower_id} AND user2 = ${user_id}`
        )

        //If there's no record of those two user
        if (status.rowCount === 0) {
            res.status(HTTPCode.BadRequest).json({
                status: 'error',
                message:
                    '[Error] You have not been follow the user, can not remove him from your follower list',
            })
            return
        }

        let query_remove_follower
        if (status.rows[0].status === false) {
            query_remove_follower = `DELETE FROM FollowRelationship WHERE user1 = ${follower_id} AND user2 = ${user_id}`
        } else if (status.rows[0].status === true) {
            query_remove_follower = `DELETE FROM FollowRelationship WHERE user1 = ${follower_id} AND user2 = ${user_id};UPDATE Profile SET num_of_follower = num_of_follower - 1 WHERE user_id = ${user_id};UPDATE Profile SET num_of_following = num_of_following - 1 WHERE user_id = ${follower_id}`
        }

        await database.query(query_remove_follower)

        //The record is deleted

        res.status(HTTPCode.Ok).json({
            status: 'success',
            data: {},
            message: '[INFO] Remove user from follower list success',
        })
    } catch (err) {
        console.error(
            `[Error] Failed to operate following list.\n Error: ${err}`
        )
        res.status(HTTPCode.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
    }
})

// Approve
follow_router.put('/followerlist/:id', async (req, res) => {
    //Check validity
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

    try {
        const user_id = req.session.uid
        const following_id = req.params.id
        const database = await connect_db()
        const query = `UPDATE FollowRelationship SET status = true WHERE user1 = ${following_id} AND user2 = ${user_id}`

        await database.query(query)

        res.status(HTTPCode.Ok).json({
            status: 'deleted',
            data: {},
            message: '[INFO] Updating the status succesffully',
        })
    } catch (err) {
        console.error(
            `[Error] Failed to operate following list.\n Error: ${err}`
        )
        res.status(HTTPCode.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
    }
})
module.exports = follow_router
