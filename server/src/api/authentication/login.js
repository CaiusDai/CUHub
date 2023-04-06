const express = require('express')
const { connect_db } = require('../../configs/db')

const login_router = express.Router()

login_router.get('/', async (req, res) => {
    //Get the input data from the request
    const username = req.query.username
    const password = req.query.password
    console.log(username)
    console.log(password)
    //Format the query
    const query = `SELECT * FROM Account WHERE username = '${username}' AND password = '${password}'`
    console.log(query)
    //Operation on db
    const database = await connect_db()
    database
        .query(query)
        .then((db_result) => {
            if (db_result.rowCount == 0) {
                res.status(404).json({
                    status: 'fail',
                    data: {
                        is_valid: 'false',
                    },
                    message: "Can not find the user's information",
                })
            } else {
                req.session.isAuthenticated = true
                req.session.username = username
                res.status(200).json({
                    status: 'success',
                    data: {
                        is_valid: 'true',
                    },
                    message: 'User logged in',
                })
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
