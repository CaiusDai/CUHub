const express = require('express')
const { connect_db } = require('../configs/db')
const config = require('../configs/configs')
const { Query } = require('pg')
const HTTPCode = config.HTTPCode
const follow_router = express.Router()

follow_router.get('/followinglist',async (req,res)=>{

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

    try{
        const user_id = req.session.uid
        const database = await connect_db()

        const query_get_followinglist = `SELECT * FROM Account,FollowRelationship WHERE Account.user_id = FollowRelationship.user2 AND FollowRelationship.user1 = ${user_id}`
        const db_result = await database.query(query_get_followinglist)

        //The user have no following user
        if(db_result.rowCount === 0)
        {
            res.status(HTTPCode.Ok).json({
                status: 'none',
                data: {
                },
                message: "[INFO] You have no following user",
            })
            return

        }

        //The current user have at least one following user
        const user_list = db_result.rows.map((row)=>{
            return{
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
            message: "[INFO] Sent all following user already",
        })



    }
    catch(err){
        console.error(`[Error] Failed to send following list.\n Error: ${err}`)
            res.status(HTTPCode.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })

    }
})

follow_router.delete('/followinglist:id',async (req,res)=>{

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

    try{
        const user_id = req.session.uid
        const following_id = req.params.id
        const database = await connect_db()
        
        const status = await database.query(`SELECT status FROM FollowRelationship WHERE user1 = ${user_id} AND user2 = ${following_id}`)

        //If there's no record of those two user
        if(status.rowCount === 0)
        {
            res.status(HTTPCode.BadRequest).json({
                status: 'error',
                message: '[Error] You have not follow the user, can not remove him from your following list',
            })
            return
        }


        let query_remove_following
        if(status.rows[0].status === 'false')
        {
            query_remove_following = `DELETE FROM FollowRelationship WHERE user1 = ${user_id} AND user2 = ${following_id}`
        }
        else if(status.rows[0].status === 'true')
        {
            query_remove_following = `DELETE FROM FollowRelationship WHERE user1 = ${user_id} AND user2 = ${following_id};UPDATE Profile SET num_of_follower = num_of_follower - 1 WHERE user_id = ${following_id};UPDATE Profile SET num_of_following = num_of_following - 1 WHERE user_id = ${user_id}`
        }

        await database.query(query_remove_following)

        //The record is deleted

        res.status(HTTPCode.Ok).json({
            status: 'success',
            data: {
            },
            message: "[INFO] Remove user from following list success",
        })



    }
    catch(err){
        console.error(`[Error] Failed to operate following list.\n Error: ${err}`)
            res.status(HTTPCode.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })

    }
})


follow_router.put('/followinglist:id',async (req,res)=>{

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

    try{
        const user_id = req.session.uid
        const following_id = req.params.id
        const database = await connect_db()
        
        const status = await database.query(`SELECT status FROM FollowRelationship WHERE user1 = ${user_id} AND user2 = ${following_id}`)

        //If there's no record of those two user
        if(status.rowCount === 0)
        {

            const query_insert_following = `INSERT INTO FollowRelationship (user1,user2,status,creation_time) VALUES(${user_id},${following_id},FALSE,DEFAULT)`
            await database.query(query_insert_following)
            res.status(HTTPCode.Ok).json({
                status: 'success',
                data: {
                },
                message: "[INFO] Sent request to following others successfully",
            })
            return
        }


        let query_remove_following
        if(status.rows[0].status === 'false')
        {
            query_remove_following = `DELETE FROM FollowRelationship WHERE user1 = ${user_id} AND user2 = ${following_id}`
        }
        else if(status.rows[0].status === 'true')
        {
            query_remove_following = `DELETE FROM FollowRelationship WHERE user1 = ${user_id} AND user2 = ${following_id};UPDATE Profile SET num_of_follower = num_of_follower - 1 WHERE user_id = ${following_id};UPDATE Profile SET num_of_following = num_of_following - 1 WHERE user_id = ${user_id}`
        }

        await database.query(query_remove_following)

        //The record is deleted

        res.status(HTTPCode.Ok).json({
            status: 'success',
            data: {
            },
            message: "[INFO] Updating the status succesffully",
        })



    }
    catch(err){
        console.error(`[Error] Failed to operate following list.\n Error: ${err}`)
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

follow_router.get('/followerlist',async (req,res)=>{

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

    try{
        const user_id = req.session.uid
        const database = await connect_db()

        const query_get_followinglist = `SELECT * FROM Account,FollowRelationship WHERE Account.user_id = FollowRelationship.user1 AND FollowRelationship.user2 = ${user_id}`
        const db_result = await database.query(query_get_followinglist)

        //The user have no follower
        if(db_result.rowCount === 0)
        {
            res.status(HTTPCode.Ok).json({
                status: 'none',
                data: {
                },
                message: "[INFO] You have no follower",
            })
            return

        }

        //The current user have at least one following user
        const user_list = db_result.rows.map((row)=>{
            return{
                user_id: row.user1,
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
            message: "[INFO] Sent all follower already",
        })



    }
    catch(err){
        console.error(`[Error] Failed to send follower list.\n Error: ${err}`)
            res.status(HTTPCode.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })

    }
})


follow_router.delete('/followerlist:id',async (req,res)=>{

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

    try{
        const user_id = req.session.uid
        const follower_id = req.params.id
        const database = await connect_db()
        
        const status = await database.query(`SELECT status FROM FollowRelationship WHERE user1 = ${follower_id} AND user2 = ${user_id}`)

        //If there's no record of those two user
        if(status.rowCount === 0)
        {
            res.status(HTTPCode.BadRequest).json({
                status: 'error',
                message: '[Error] You have not been follow the user, can not remove him from your follower list',
            })
            return
        }


        let query_remove_follower
        if(status.rows[0].status === 'false')
        {
            query_remove_follower = `DELETE FROM FollowRelationship WHERE user1 = ${follower_id} AND user2 = ${user_id}`
        }
        else if(status.rows[0].status === 'true')
        {
            query_remove_follower = `DELETE FROM FollowRelationship WHERE user1 = ${follower_id} AND user2 = ${user_id};UPDATE Profile SET num_of_follower = num_of_follower - 1 WHERE user_id = ${user_id};UPDATE Profile SET num_of_following = num_of_following - 1 WHERE user_id = ${follower_id}`
        }

        await database.query(query_remove_follower)

        //The record is deleted

        res.status(HTTPCode.Ok).json({
            status: 'success',
            data: {
            },
            message: "[INFO] Remove user from follower list success",
        })



    }
    catch(err){
        console.error(`[Error] Failed to operate following list.\n Error: ${err}`)
            res.status(HTTPCode.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })

    }
})

module.exports = follow_router