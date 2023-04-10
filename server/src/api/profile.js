const express = require('express')
const config = require('../configs/configs.js')

const { connect_db } = require('../configs/db.js')

const HTTPCodes = config.HTTPCode
const profile_router = express.Router()

profile_router.get('/personal', async (req, res) => {
    const user_id = req.session.uid

    //Get username and profile photo of this user
    let result_array = []
    const query_get_profile = `SELECT * FROM Profile WHERE user_id = ${user_id}`
    //Get username and photo
    const database = await connect_db()
    database.query(query_get_profile)
        .then((db_result) => {
            const result = {user}
        })
        .catch((err) => {
            console.log(
                'Error in getting the username and profile_photo and the error is:',
                err
            )
        })
    await database
        .query(query_photo_current)
        .then((db_result) => {
            photo_current = db_result.rows[0].profile_photo
        })
        .catch((err) => {
            console.log(
                'Error in getting the photo of current user and the error is :',
                err
            )
        })

    //Get all chat reocrd in a specific chat session
    const query_get_session = `SELECT session_id FROM ChatSession WHERE (user1 = ${user1_id} AND user2 = ${user2_id}) OR (user1 = ${user2_id} AND user2 = ${user1_id})`
    database
        .query(query_get_session)
        .then((db_result) => {
            const session_id = db_result.rows[0].session_id
            const query_get_chat = `SELECT sender_id,content FROM Message WHERE session_id = ${session_id} ORDER BY message_id ASC`
            database
                .query(query_get_chat)
                .then((db_result) => {
                    result_array = db_result.rows.map((row) => {
                        return {
                            username: username,
                            photo_other: photo,
                            photo_current: photo_current,
                            sender_id: row.sender_id,
                            content: row.content,
                        }
                    })

                    res.status(HTTPCodes.Ok).json({
                        status: 'success',
                        data: {
                            chat_list: result_array,
                        },
                        message: '[INFO] chat_list generated',
                    })
                })
                .catch((err) => {
                    console.log(
                        'Error in getting all the chat record and the error is:',
                        err
                    )
                    res.status(HTTPCodes.BadRequest).json({
                        status: 'error',
                        message: '[Error] Invalid query format',
                    })
                })
        })
        .catch((err) => {
            console.log('Error in finding chat sessions and the error is:', err)
            res.status(HTTPCodes.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })
        })
})

// Get : Get the profile of oneself
// Post : Create the profile for oneself
// Delete : NOT DEFINED
// Update : Edit the profile
'/profiles/me/:id'

// Get : Get the profile of a user with <id>
// Others: NOT DEFINED
'/profiles/owner/:id'

module.exports = profile_router