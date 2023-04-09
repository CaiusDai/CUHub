const express = require('express')
const { connect_db } = require('../../configs/db')
const config = require('../../configs/configs')
const signup_router = express.Router()

const HTTPCode = config.HTTPCode
signup_router.post('/', async (req, res) => {
    //Get the input data from the request
    const username = req.query.username
    const password = req.query.password
    const email = req.query.email
    if (!username || !password || !email) {
        res.status(HTTPCode.BadRequest).json({
            status: 'error',
            message: 'Wrong query format on inserting profile',
        })
        return
    }
    let is_valid = username == 'Admin' ? false : true
    const database = await connect_db()
    //Check if the log_in_name exist or not
    database
        .query(`SELECT * FROM Account WHERE email = '${email}'`)
        .then((db_result) => {
            if (db_result.rowCount == 1) {
                is_valid = false
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(HTTPCode.BadRequest).json({
                status: 'error',
                message: 'Wrong query at checking email exist or not',
            })
        })

    //If the log_in_name is same as admin or already exist, reject the request
    if (is_valid == false) {
        res.status(HTTPCode.Ok).json({
            status: 'fail',
            data: {
                error_code: config.ErrorCodes.InvalidRequest,
            },
            message: 'Your email already exist, please reset the email',
        })
    }

    //The input log_in_name is not same as admin and is not already exist , accept the request
    else {
        //Format the query for creating account
        const query_account = `INSERT INTO Account VALUES(DEFAULT,'${username}','${email}','${password}',FALSE)`
        database
            .query(query_account)
            .then((db_result) => {
                // Insert User
                console.log('[INFO] Created New Account already.')
                console.log(db_result)
                return database.query(
                    `SELECT user_id FROM Account WHERE email = '${email}'`
                )
            })
            .then((db_result) => {
                // Insert Profile
                let user_id = db_result.rows[0].user_id
                return database.query(
                    `INSERT INTO Profile VALUES('${user_id}',NULL,DEFAULT,NULL,NULL,NULL,NULL,DEFAULT,DEFAULT)`
                )
            })
            .then((db_result) => {
                // Send back result
                console.log('[INFO] Signup successed')
                console.log(db_result)
                res.status(HTTPCode.Ok).json({
                    status: 'success',
                    message: 'Successfully sign',
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(HTTPCode.BadRequest).json({
                    status: 'error',
                    message: 'Wrong query format on inserting profile',
                })
            })
    }
}) // End of Router

module.exports = signup_router
