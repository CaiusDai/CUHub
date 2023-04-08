const express = require('express')
const { connect_db } = require('../../configs/db')

const login_router = express.Router()

const IdentityCodes = {
    Admin: 0,
    NormalUser: 1,
    Visitor: 2,
}

login_router.get('/', async (req, res) => {
    //Get the input data from the request
    const username = req.query.username
    const password = req.query.password
    const is_admin = username == 'Admin' ? true : false
    //Format the query.
    const query = is_admin
        ? `SELECT * FROM Admin WHERE username = ${username} AND password = ${password}`
        : `SELECT * FROM Account WHERE username = ${username} AND password = ${password}`
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
