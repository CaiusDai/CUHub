const express = require('express')
const { connect_db } = require('../../configs/db')
const config = require('../../configs/configs')
const HTTPCode = config.HTTPCode
const comment_router = express.Router()


//Get all comments of a specific post

comment_router.get('/:post_id', async (req, res) => {

    try {
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

        //Get data from request
        const post_id = req.params.post_id
        const database = await connect_db()
        const result_array = []

        //First get profile
        const query_get_post = `SELECT * FROM Post WHERE post_id = ${post_id}`
        let db_result = await database.query(query_get_post)
        result_array.post = db_result.rows[0]

        //Then get comments
        const query_get_comment = `SELECT * FROM Comment WHERE post_id = ${post_id} ORDER BY comment_id ASEC`
        db_result = await database.query(query_get_comment)
        result_array.comments = db_result.rows.map((row) => {
            return row
        })

        res.status(HTTPCode.Ok).json({
            status: 'success',
            data: {
                result_list: result_array
            },
            message: "[INFO] Return the comment list",
        })
        return


    }
    catch (err) {
        console.error(`[Error] Failed to get comments.\n Error: ${err}`)
        res.status(HTTPCode.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })

    }




})

//Add comment to a post
comment_router.post('/', async (req, res) => {

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


    //Get input from query
    const { commentContent, post_id } = req.body
    const user_id = req.session.uid
    //Connect database
    const database = await connect_db()

    //Update numOfComments in Post table then adding new record to Comment table
    try {
        //First get user_id of post owner
        const query_get_id = `SELECT user_id FROM Post WHERE post_id = ${post_id}`
        const db_result = await database.query(query_get_id)
        const user_id_other = db_result.rows[0].user_id
        //If the user comment his own post
        if(user_id === user_id_other)
        {
            res.status(HTTPCode.BadRequest).json({
                status: 'fail',
                message: '[Error] You can not reply to yourself',
            })
            return
            
        }


        const query_all = `UPDATE Post SET num_comment = num_comment + 1 WHERE post_id = ${post_id};INSERT INTO Comment VALUES(DEFAULT,${user_id},${post_id},${user_id_other},'${commentContent}',DEFAULT)`

        await database.query(query_all)

        res.status(HTTPCode.Ok).json({
            status: 'success',
            data: {
            },
            message: "[INFO] Adding new comment successfully",
        })

    }
    catch (err) {
        console.error(`[Error] Failed to adding comment.\n Error: ${err}`)
        res.status(HTTPCode.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
    }

})

//Add comment to a comment
comment_router.post('/reply', async (req, res) => {

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
    //Get input from query
    const { commentContent, comment_id } = req.body
    const user_id = req.session.uid
    //Connect database
    const database = await connect_db()

    //Update numOfComments in Post table then adding new record to Comment table
    try {
        //First find post_id using comment_id
        const query_get_post = `SELECT post_id,user_id FROM Comment WHERE comment_id = ${comment_id}`
        let db_result = await database.query(query_get_post)
        const post_id = db_result.rows[0].post_id
        const user_id_other = db_result.rows[0].user_id

        //If the user comment on his own comments
        if(user_id_other === user_id)
        {
            res.status(HTTPCode.BadRequest).json({
                status: 'fail',
                message: '[Error] You can not reply to yourself',
            })
            return

        }

        const query_insert_and_add_number = `UPDATE Post SET num_comment = num_comment + 1 WHERE post_id = ${post_id};INSERT INTO Comment VALUES(DEFAULT,${user_id},${post_id},${user_id_other},'${commentContent}',DEFAULT)`
        await database.query(query_insert_and_add_number)

        res.status(HTTPCode.Ok).json({
            status: 'success',
            data: {
            },
            message: "[INFO] Adding new comment to comment successfully",
        })

    }
    catch (err) {
        console.error(`[Error] Failed to adding comment.\n Error: ${err}`)
        res.status(HTTPCode.BadRequest).json({
            status: 'error',
            message: '[Error] Invalid query format',
        })
    }

})



module.exports = comment_router