const express = require('express')
const { connect_db } = require('../../configs/db')
const config = require('../../configs/configs')
const login_router = express.Router()

async function get_blocking_time(database, userid) {
    const query = `SELECT start_at, end_at
                   FROM Block B
                   WHERE B.user_id = ${userid}`
    return database
        .query(query)
        .then((result) => {
            if (result.rowCount == 0) {
                return Promise.reject(
                    `[Error] Can not find the blocking record of ${userid}`
                )
            }
            const { start_at, end_at } = result.rows[0]
            return {
                start_time: new Date(start_at),
                end_time: new Date(end_at),
            }
        })
        .catch((error) => {
            console.log('[Error] When trying to read from the blocking list')
            console.log(error)
            return Promise.reject(error)
        })
}

login_router.get('/', async (req, res) => {
    //Get the input data from the request
    const email = req.query.email
    const password = req.query.password
    if (!email || !password) {
        res.status(config.HTTPCode.BadRequest).json({
            status: 'error',
            message: 'Wrong query format',
        })
        return
    }

    const is_admin = email === 'Admin' ? true : false
    //Format the query.
    const query = is_admin
        ? `SELECT * FROM Admin WHERE username = '${email}' AND password = '${password}'`
        : `SELECT * FROM Account WHERE email = '${email}' AND password = '${password}'`
    //Operation on db
    const database = await connect_db()
    database
        .query(query)
        .then((db_result) => {
            if (db_result.rowCount == 0) {
                res.status(config.HTTPCode.NotFound).json({
                    status: 'fail',
                    data: {
                        result_code: config.IdentityCodes.Visitor,
                    },
                    message: "Can not find the user's information",
                })
            } else {
                const is_blocked = db_result.rows[0].is_blocked
                if (is_blocked) {
                    get_blocking_time(database, db_result.rows[0].user_id)
                        .then((result) => {
                            const { start_time, end_time } = result
                            res.status(config.HTTPCode.Ok).json({
                                status: 'success',
                                data: {
                                    result_code: config.IdentityCodes.Blocked,
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
                            res.status(config.HTTPCode.BadRequest).json({
                                status: 'error',
                                message: 'Wrong query format',
                            })
                        })
                } else {
                    req.session.isAuthenticated = true
                    req.session.isAdmin = is_admin
                    req.session.uid = is_admin
                        ? db_result.rows[0].admin_id
                        : db_result.rows[0].user_id
                    const identity_code = is_admin
                        ? config.IdentityCodes.Admin
                        : config.IdentityCodes.NormalUser
                    res.status(config.HTTPCode.Ok).json({
                        status: 'success',
                        data: {
                            result_code: identity_code,
                        },
                        message: 'Success Login',
                    })
                }
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(config.HTTPCode.BadRequest).json({
                status: 'error',
                message: 'Wrong query format',
            })
        })
}) // End of Router

module.exports = login_router
