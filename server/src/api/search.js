const express = require('express')
const { connect_db } = require('../configs/db')
const config = require('../configs/configs')
const HTTPCode = config.HTTPCode
const search_router = express.Router()

search_router.get('/', async (req, res) => {
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
        //Get input from request body
        const searchContent = req.query.searchContent
        const user_id = req.session.uid
        const database = await connect_db()
        const query_search = `SELECT Account.user_id, Account.username, Account.email, FollowRelationship.status, FollowRelationship.status FROM Account LEFT JOIN FollowRelationship ON Account.user_id = FollowRelationship.user2 AND FollowRelationship.user1 = ${user_id} WHERE Account.username = '${searchContent}' AND Account.is_blocked = FALSE AND Account.user_id != ${user_id}`
        const db_result = await database.query(query_search)

        //If no user found
        if (db_result.rowCount === 0) {
            res.status(HTTPCode.Ok).json({
                status: 'none',
                data: {},
                message: '[INFO] No user found',
            })
            return
        }
        //Found at least one user
        else {
            const result_array = db_result.rows.map((row) => {
                return {
                    user_id: row.user_id,
                    username: row.username,
                    email: row.email,
                    status: row.status,
                }
            })
            console.log(result_array)

            res.status(HTTPCode.Ok).json({
                status: 'success',
                data: {
                    user_list: result_array,
                },
                message: '[INFO] Return the user list',
            })
            return
        }
    } catch (err) {
        console.error(`[Error] Failed to search user.\n Error: ${err}`)
        res.status(HTTPCode.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
    }
})

//For search, handling 
search_router.put('/followinglist/:id',async (req,res)=>{

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

        //If there's no record of those two user, add pending record to database, for user clicking following button on search page
        if(status.rowCount === 0)
        {

            const query_insert_following = `INSERT INTO FollowRelationship (user1,user2,status,creation_time) VALUES(${user_id},${following_id},FALSE,DEFAULT)`
            await database.query(query_insert_following)
            res.status(HTTPCode.Ok).json({
                status: 'inserted',
                data: {
                },
                message: "[INFO] Sent request to following others successfully",
            })
            return
        }

        //If there's existed record on database, no matter pending or approved, if user click button on search page, 
        //the follow record will be deleted, and only update num_of_following and num_of_follower when the status is true

        let query_remove_following
        if(status.rows[0].status === false)
        {
            query_remove_following = `DELETE FROM FollowRelationship WHERE user1 = ${user_id} AND user2 = ${following_id}`
        }
        else if(status.rows[0].status === true)
        {
            query_remove_following = `DELETE FROM FollowRelationship WHERE user1 = ${user_id} AND user2 = ${following_id};UPDATE Profile SET num_of_follower = num_of_follower - 1 WHERE user_id = ${following_id};UPDATE Profile SET num_of_following = num_of_following - 1 WHERE user_id = ${user_id}`
        }

        await database.query(query_remove_following)

        //The record is deleted

        res.status(HTTPCode.Ok).json({
            status: 'deleted',
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

module.exports = search_router
