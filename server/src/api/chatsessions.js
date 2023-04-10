const express = require('express')
const config = require('../configs/configs.js')

const { connect_db } = require('../configs/db.js')

const HTTPCodes = config.HTTPCode
const chat_router = express.Router()

chat_router.get('/session', async (req, res) => {
    //Get user_id of current user
    const user_id = req.session.uid
    let result_array = []
    //Get all chat_session realted to the user
    const query_get_sessions = `SELECT * FROM ChatSession WHERE user1 = ${user_id} OR user2 = ${user_id}`
    const database = await connect_db()
    database
        .query(query_get_sessions)
        .then(async (db_result) => {
            //Get all sessions related to the user
            const session_list = db_result.rows.map((row) => {
                return {
                    session_id: row.session_id,
                    user1: row.user1,
                    user2: row.user2,
                }
            })
            for (let index = 0; index < session_list.length; index++) {
                //The current user is user1 in the chat_session, get information using user2
                if (session_list[index].user1 === user_id) {
                    let result_one_user = {}
                    //the result_one_user should in the format{user_id:xxx, username:xxx, photo:xxx}
                    result_one_user.user_id = session_list[index].user2

                    const query_get_username_photo = `SELECT username,profile_photo FROM Account,Profile WHERE Account.user_id = Profile.user_id AND Account.user_id =${session_list[index].user2}`

                    await database
                        .query(query_get_username_photo)
                        .then((db_result) => {
                            result_one_user.username =
                                db_result.rows[0].username
                            result_one_user.photo =
                                db_result.rows[0].profile_photo

                            result_array.push(result_one_user)
                        })
                        .catch((err) => {
                            console.log(
                                'Error in finding username,the error is:',
                                err
                            )
                            res.status(HTTPCodes.BadRequest).json({
                                status: 'error',
                                message: '[Error] Invalid query format',
                            })
                        })
                }
                //The current user is user2 in the chat session record, get information using user1
                else {
                    let result_one_user = {}
                    result_one_user.user_id = session_list[index].user1
                    //the result_one_user should in the format{user_id:xxx, username:xxx, photo:xxx}
                    const query_get_username_photo = `SELECT username,profile_photo FROM Account,Profile WHERE Account.user_id = Profile.user_id AND Account.user_id = ${session_list[index].user1}`

                    database
                        .query(query_get_username_photo)
                        .then((db_result) => {
                            result_one_user.username =
                                db_result.rows[0].username
                            result_one_user.photo =
                                db_result.rows[0].profile_photo

                            result_array.push(result_one_user)
                        })
                        .catch((err) => {
                            console.log(
                                'Error in finding username and the error is :',
                                err
                            )
                            res.status(HTTPCodes.BadRequest).json({
                                status: 'error',
                                message: '[Error] Invalid query format',
                            })
                        })
                }
            }
        })
        .then(() => {
            console.log(result_array)
            res.status(HTTPCodes.Ok).json({
                status: 'success',
                data: {
                    user_list: result_array,
                },
                message: '[INFO] chat_list generated',
            })
        })
        .catch((err) => {
            console.log('The error is:', err)
            console.log('Error in finding chat sessions')
            res.status(HTTPCodes.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })
        })
})

chat_router.post('/session', async (req, res) => {
    //Get user_id of current user
    const user_id = req.session.uid
    const other_id = req.query.user_id

    //Get all chat_session realted to the user
    const query_get_session = `SELECT session_id FROM ChatSession WHERE (user1 = ${user_id} AND user2 = ${other_id}) OR (user1 = ${other_id} AND user2 = ${user_id})`
    const database = await connect_db()
    database.query(query_get_session).then(async (db_result) => {
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
        //The session does not exist, examine can the user create session?
        else {
            const query_examine = `SELECT * FROM FollowRelationship WHERE (user1 = ${user_id} AND user2 = ${other_id} AND status = TRUE) OR (user1 = ${other_id} AND user2 = ${user_id} AND status = TRUE)`
            await database.query(query_examine).then(async (db_result) => {
                //User can open a new session
                if (db_result.rowCount == 2) {
                    const query_create_session = `INSERT INTO ChatSession VALUES(DEFAULT,${user_id},${other_id})`
                    await database.query(query_create_session).catch((err) => {
                        console.log(
                            'Error in inserting new session, the error is :',
                            err
                        )
                    })

                    res.status(HTTPCodes.Ok).json({
                        status: 'success',
                        data: {
                            user_id: other_id,
                        },
                        message: '[INFO] Create a new session',
                    })
                    return
                } else {
                    res.status(HTTPCodes.BadRequest).json({
                        status: 'fail',
                        message: '[INFO] You cant chat with the user',
                    })
                    return
                }
            })
        }
    })
})

//Insert a new mesage into session
chat_router.post('/message', async (req, res) => {
    const user1_id = req.session.uid
    const user2_id = req.query.user_id //user2_id is the user that current user is chatting with
    const content = req.query.content
    const sender_id = req.query.sender_id

    //Get all chat reocrd in a specific chat session
    const query_get_session = `SELECT session_id FROM ChatSession WHERE (user1 = ${user1_id} AND user2 = ${user2_id}) OR (user1 = ${user2_id} AND user2 = ${user1_id})`
    const database = await connect_db()
    database
        .query(query_get_session)
        .then((db_result) => {
            const session_id = db_result.rows[0].session_id
            const query_add_message = `INSERT INTO Message VALUES(${session_id},DEFAULT,${sender_id},'${content}')`
            database
                .query(query_add_message)
                .then(() => {
                    res.status(HTTPCodes.Ok).json({
                        status: 'success',
                        message: '[INFO] message inserted',
                    })
                })
                .catch((err) => {
                    console.log(
                        'Error in getting all the chat record,the error is :',
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

chat_router.get('/message', async (req, res) => {
    const user1_id = req.session.uid
    const user2_id = req.query.user_id //user2_id is the user that current user is chatting with

    //Get username and profile photo of this user
    let photo
    let username
    let photo_current
    let result_array = []
    const query_username_photo = `SELECT username,profile_photo FROM Account,Profile WHERE Account.user_id = Profile.user_id AND Account.user_id =${user2_id}`
    const query_photo_current = `SELECT profile_photo FROM Profile WHERE user_id = ${user1_id}`
    //Get username and photo
    const database = await connect_db()
    await database
        .query(query_username_photo)
        .then((db_result) => {
            photo = db_result.rows[0].profile_photo
            username = db_result.rows[0].username
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

module.exports = chat_router
