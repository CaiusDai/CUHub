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

module.exports = search_router
