const express = require('express')
const config = require('../../configs/configs.js')
const utils = require('../../util/utils')
const { connect_db } = require('../../configs/db')

const HTTPCodes = config.HTTPCode
const block_router = express.Router()

block_router.get('/', (req, res) => {
    // Check identity:
    if (!req.session.isAdmin) {
        res.status(HTTPCodes.Unauthorized).json({
            status: 'fail',
            data: {
                error_code: config.ErrorCodes.NotAdmin,
            },
            message: 'Blocking list can only be generated by the admin',
        })
        return
    }
    // Send blocking list
    const query =
        'SELECT A.email,B.start_at AS startAt,B.end_at AS endAt\
                    FROM Account A, Block B\
                    WHERE A.user_id = B.user_id'
    connect_db()
        .then((database) => database.query(query))
        .then((db_result) => {
            console.log(db_result)
            const blocking_list = db_result.rows.map((row) => {
                return {
                    email: row.email,
                    startAt: utils.format_date(row.startat),
                    endAt: utils.format_date(row.endat),
                }
            })

            res.status(HTTPCodes.Ok).json({
                status: 'success',
                data: {
                    block_list: blocking_list,
                },
                message: '[INFO] Blocking list generated',
            })
            console.log(db_result)
        })
        .catch((err) => {
            console.error(
                `[Error] Failed to send blocking list.\n Error: ${err}`
            )
            res.status(HTTPCodes.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })
        })
})

block_router.post('/', (req, res) => {
    // Check identity:
    if (!req.session.isAdmin) {
        res.status(HTTPCodes.Unauthorized).json({
            status: 'fail',
            data: {
                error_code: config.ErrorCodes.NotAdmin,
            },
            message: 'Blocking operation can only be generated by the admin',
        })
        return
    }
    //
    const user_id = req.query.user_id
    const admin_id = req.session.uid
    const end_at = req.query.end_at

    const query_check_status = `SELECT is_blocked FROM Account WHERE user_id = ${user_id}`
    const query_change_status = `UPDATE Account SET is_blocked = TRUE WHERE user_id = ${user_id}`
    const query_insert_record = `INSERT INTO Block VALUES(DEFAULT, ${user_id},${admin_id},DEFAULT, '${end_at}')`
    //First check the blocking status of the user, then update the account db, then add the blocking record to block db
    connect_db()
        .then((database) => database.query(query_check_status))
        .then((db_result) => {
            //If the user is under blocking now
            if (db_result.rows[0].is_blocked === true) {
                res.status(HTTPCodes.BadRequest).json({
                    status: 'fail',
                    data: {
                        error_code: config.ErrorCodes.InvalidRequest,
                    },
                    message: 'Blocking a user that had been blocked before',
                })
                return
            }
            //The user is unblocked now, doing blocking operation now
            else {
                //Then update the blocking status of the user
                connect_db()
                    .then((database) => database.query(query_change_status))
                    .then(() => {
                        //Then insert the record to blocking list
                        connect_db()
                            .then((database) =>
                                database.query(query_insert_record)
                            )
                            .then(() => {
                                res.status(HTTPCodes.Ok).json({
                                    status: 'success',
                                    message:
                                        '[INFO] Insert a new block record completed',
                                })
                            })
                            .catch((err) => {
                                console.error(
                                    `[Error] Failed to insert into blocking list.\n Error: ${err}`
                                )
                                res.status(HTTPCodes.BadRequest).json({
                                    status: 'error',
                                    message: '[Error] Invalid query format',
                                })
                            })
                    })
                    .catch((err) => {
                        console.error(
                            `[Error] Failed to update the blocking status of the user.\n Error: ${err}`
                        )
                        res.status(HTTPCodes.BadRequest).json({
                            status: 'error',
                            message: '[Error] Invalid query format',
                        })
                    })
            }
        })
        .catch((err) => {
            console.error(
                `[Error] Failed to check the blocking status of the user.\n Error: ${err}`
            )
            res.status(HTTPCodes.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })
        })
})
module.exports = block_router
