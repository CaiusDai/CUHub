const express = require('express')
const config = require('../configs/configs.js')

const { connect_db } = require('../configs/db.js')

const HTTPCodes = config.HTTPCode
const chat_router = express.Router()

chat_router.get('/session', async (req, res) => {
    //Get user_id of current user
    const user_id = req.session.uid
    let result_array = {}
    const database = await connect_db()

    try {
        //Get all chat_session realted to the user
        const query_get_sessions = `SELECT * FROM ChatSession WHERE user1 = ${user_id} OR user2 = ${user_id}`
        let db_result = await database.query(query_get_sessions)
        const session_list = db_result.rows.map((row) => {
            return {
                session_id: row.session_id,
                user1: row.user1,
                user2: row.user2,
            }
        })

        for (let index = 0; index < session_list.length; index++) {
            let result_one_user = {}
            let query_get_username_photo
            //The current user is user1, user user2_id to get profile photo and username
            if (session_list[index].user1 === user_id) {
                result_one_user.user1_id = session_list[index].user2
                query_get_username_photo = `SELECT username,profile_photo FROM Account,Profile WHERE Account.user_id = Profile.user_id AND Account.user_id =${session_list[index].user2}`
            }
            //The current user is user2, in the contrary set the id as user1_id
            else {
                result_one_user.user_id = session_list[index].user1
                query_get_username_photo = `SELECT username,profile_photo FROM Account,Profile WHERE Account.user_id = Profile.user_id AND Account.user_id = ${session_list[index].user1}`
            }

            let db_result = await database.query(query_get_username_photo)
            result_one_user.username = db_result.rows[0].username
            result_one_user.photo = db_result.rows[0].profile_photo
            //Push one record into the list
            result_array.push(result_one_user)
        }

        //Send response
        res.status(HTTPCodes.Ok).json({
            status: 'success',
            data: {
                user_list: result_array,
            },
            message: '[INFO] chat_list generated',
        })
    } catch (err) {
        console.log(`[ERROR] is :${err}`)
        res.status(HTTPCodes.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
    }
})

chat_router.post('/session', async (req, res) => {
    //Get user_id of current user
    const user_id = req.session.uid
    const other_id = req.query.user_id

    const database = await connect_db()

    try {
        //Get all chat_session realted to the user
        const query_get_session = `SELECT session_id FROM ChatSession WHERE (user1 = ${user_id} AND user2 = ${other_id}) OR (user1 = ${other_id} AND user2 = ${user_id})`
        let db_result = await database.query(query_get_session)
        //The session between these two user already exist
        if (db_result.rowCount === 1) {
            res.status(HTTPCodes.Ok).json({
                status: 'success',
                data: {
                    user_id: other_id,
                },
                message: '[INFO] You have an existed session with the user',
            })
            return
        }
        //The session does not exist, examine can the user create session or not
        else {
            //Check if those two user follow each other
            const query_examine = `SELECT * FROM FollowRelationship WHERE (user1 = ${user_id} AND user2 = ${other_id} AND status = TRUE) OR (user1 = ${other_id} AND user2 = ${user_id} AND status = TRUE)`
            let db_result = await database.query(query_examine)
            //User can open a new session because they follow each other
            if (db_result.rowCount == 2) {
                const query_create_session = `INSERT INTO ChatSession VALUES(DEFAULT,${user_id},${other_id})`
                await database.query(query_create_session)
                //Send response
                res.status(HTTPCodes.Ok).json({
                    status: 'success',
                    data: {
                        user_id: other_id,
                    },
                    message: '[INFO] Create a new session',
                })
            } else {
                res.status(HTTPCodes.BadRequest).json({
                    status: 'fail',
                    message: '[INFO] You cant chat with the user',
                })
            }
        }
    } catch (err) {
        console.log(`[ERROR] is :${err}`)
        res.status(HTTPCodes.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
    }
})

//Insert a new mesage into session
chat_router.post('/message', async (req, res) => {
    const user1_id = req.session.uid
    const user2_id = req.query.user_id //user2_id is the user that current user is chatting with
    const content = req.query.content
    const sender_id = req.query.sender_id

    const database = await connect_db()

    try {
        //First get session_id
        const query_get_session = `SELECT session_id FROM ChatSession WHERE (user1 = ${user1_id} AND user2 = ${user2_id}) OR (user1 = ${user2_id} AND user2 = ${user1_id})`
        let db_result = await database.query(query_get_session)
        const session_id = db_result.rows[0].session_id

        //Insert message in corresponding chatsession
        const query_add_message = `INSERT INTO Message VALUES(${session_id},DEFAULT,${sender_id},'${content}')`
        await database.query(query_add_message)

        //Send response
        res.status(HTTPCodes.Ok).json({
            status: 'success',
            message: '[INFO] message inserted',
        })
    } catch (err) {
        console.log(`[Error] is: ${err}`)
        res.status(HTTPCodes.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
    }
})

chat_router.get('/message', async (req, res) => {
    const user1_id = req.session.uid
    const user2_id = req.query.user_id //user2_id is the user that current user is chatting with

    //Get username and profile photo of this user
    let photo
    let username
    let photo_current
    let result_array = {}
    const database = await connect_db()

    //Get username and photo of other user
    try {
        const query_username_photo = `SELECT username,profile_photo FROM Account,Profile WHERE Account.user_id = Profile.user_id AND Account.user_id =${user2_id}`
        const db_result = await database.query(query_username_photo)
        photo = db_result.rows[0].profile_photo
        username = db_result.rows[0].username
    } catch (err) {
        ;`[Error] in first query is: ${err}`
        res.status(HTTPCodes.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
        return
    }

    //Get profile_photo of current user
    try {
        const query_photo_current = `SELECT profile_photo FROM Profile WHERE user_id = ${user1_id}`
        const db_result = await database.query(query_photo_current)
        photo_current = db_result.rows[0].profile_photo
    } catch (err) {
        ;`[Error] in second query is: ${err}`
        res.status(HTTPCodes.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
        return
    }

    //Get all chat reocrd in a specific chat session
    try {
        const query_get_session = `SELECT session_id FROM ChatSession WHERE (user1 = ${user1_id} AND user2 = ${user2_id}) OR (user1 = ${user2_id} AND user2 = ${user1_id})`
        const db_result = await database.query(query_get_session)
        const session_id = db_result.rows[0].session_id
        const query_get_chat = `SELECT sender_id,content FROM Message WHERE session_id = ${session_id} ORDER BY message_id ASC`
        const db_result_chat = await database.query(query_get_chat)
        //map all the messages
        result_array = db_result_chat.rows.map((row) => {
            return {
                username: username,
                photo_other: photo,
                photo_current: photo_current,
                sender_id: row.sender_id,
                content: row.content,
            }
        })

        //Send the response
        res.status(HTTPCodes.Ok).json({
            status: 'success',
            data: {
                chat_list: result_array,
            },
            message: '[INFO] chat_list generated',
        })
    } catch (err) {
        console.log(`[Error] in final query is: ${err}`)
        res.status(HTTPCodes.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
    }
})

module.exports = chat_router
