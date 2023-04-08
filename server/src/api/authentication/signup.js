const express = require('express')
const { connect_db } = require('../../configs/db')

const signup_router = express.Router()

const IdentityCodes = {
    Admin: 0,
    NormalUser: 1,
    Visitor: 2,
    Blocked: 3,
}

signup_router.post('/', async (req, res) => {
    //Get the input data from the request
    const username = req.query.username
    const password = req.query.password
    const email = req.query.email
    console.log(username)
    console.log(password)
    console.log(email)
    let is_valid = username == 'Admin' ? false : true
    const database = await connect_db()
    //Check if the log_in_name exist or not
    await database.query(`SELECT * FROM Account WHERE email = '${email}'`)
        .then((db_result) => {
            if (db_result.rowCount == 1) {
                is_valid = false
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({
                status: 'error',
                message: 'Wrong query at checking email exist or not',
            })
        })

    //If the log_in_name is same as admin or already exist, reject the request
    if (is_valid == false) {
        res.status(400).json({
            status: 'fail',
            message: 'Your email already exist, please reset the email'
        })
    }

    //The input log_in_name is not same as admin and is not already exist , accept the request
    else {
        //Format the query for creating account
        const query_account = `INSERT INTO Account VALUES(DEFAULT,'${username}','${email}','${password}',FALSE)`
        await database.query(query_account)
            .then((db_result) => { })
            .catch((err) => {
                console.log(err)
            })
        let user_id = undefined
        await database.query(`SELECT user_id FROM Account WHERE email = '${email}'`)
            .then((result) => {
                user_id = result.rows[0].user_id
            })
        const query_profile = `INSERT INTO Profile VALUES('${user_id}',NULL,DEFAULT,NULL,NULL,NULL,NULL,DEFAULT,DEFAULT)`
        //Operation on db
        await database
            .query(query_profile)
            .then((db_result) => {
                res.status(200).json({
                    status: 'success',
                    message: 'Successfully sign',
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({
                    status: 'error',
                    message: 'Wrong query format on inserting profile',
                })
            })
    }
}) // End of Router

module.exports = signup_router
