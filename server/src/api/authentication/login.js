const express = require('express')
const { connect_db } = require('../../configs/db')

const login_router = express.Router()

const IdentityCodes = {
    Admin: 0,
    NormalUser: 1,
    Visitor: 2,
    Blocked: 3,
}

async function get_blocking_time(database, userid) {
    const query = `SELECT start_at, end_at
                   FROM Block B
                   WHERE B.user_id = ${userid}`
    return database
        .query(query)
        .then((result) => {
            if (result.rowCount == 0) {
                return Promise.reject(
                    `[Error] Can not find the nlocking record of ${userid}`
                )
            }
            const { start_at, end_at } = result.rows[0]
            return { start_time: new Date(start_at), end_time: new Date(end_at) }
        })
        .catch((error) => {
            console.log('[Error] When trying to read from the blocking list')
            console.log(error)
            return Promise.reject(error)
        })
}

login_router.get('/', async (req, res) => {
    //Get the input data from the request
    const username = req.query.username
    const password = req.query.password
    const is_admin = username === "Admin" ? true : false
    console.log(username)
    console.log(password)
    //Format the query.
    const query = is_admin
        ? `SELECT * FROM Admin WHERE username = '${username}' AND password = '${password}'`
        : `SELECT * FROM Account WHERE log_in_name = '${username}' AND password = '${password}'`
    //Operation on db
    const database = await connect_db()
    database
        .query(query)
        .then((db_result) => {
            if (db_result.rowCount == 0) {
                res.status(404).json({
                    status: 'fail',
                    data: {
                        result_code: `"${IdentityCodes.Visitor}"`,
                    },
                    message: "Can not find the user's information",
                })
            } else {
                const is_blocked = db_result.rows[0].is_blocked
                if (is_blocked) {
                    get_blocking_time(database, db_result.rows[0].user_id)
                        .then((result) => {
                            const { start_time, end_time } = result
                            res.status(200).json({
                                status: 'success',
                                data: {
                                    result_code: `"${IdentityCodes.Blocked}"`,
                                    start_time: `${start_time.toDateString()},${start_time.toLocaleTimeString()}`,
                                    end_time: `${end_time.toDateString()},${end_time.toLocaleTimeString()}`,
                                },
                                message: 'Found a blocked user',
                            })
                        })
                        .catch((error) => {
                            console.log(
                                '[Error] When trying to read from the blocking list'
                            )
                            console.log(error)
                            res.status(400).json({
                                status: 'error',
                                message: 'Wrong query format',
                            })
                        })
                } else {
                    req.session.isAuthenticated = true
                    req.session.isAdmin = is_admin
                    req.session.username = username
                    const identity_code = is_admin
                        ? IdentityCodes.Admin
                        : IdentityCodes.NormalUser
                    res.status(200).json({
                        status: 'success',
                        data: {
                            result_code: `"${identity_code}"`,
                        },
                        message: 'Success Login',
                    })
                }
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({
                status: 'error',
                message: 'Wrong query format',
            })
        })
}) // End of Router

module.exports = login_router
