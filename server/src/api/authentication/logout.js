// logout_router.js
const express = require('express')
const config = require('../../configs/configs.js')

const HTTPCodes = config.HTTPCode
const logout_router = express.Router()

logout_router.delete('/', (req, res) => {
    // Check identity:
    if (!req.session || !req.session.isAuthenticated) {
        res.status(HTTPCodes.Unauthorized).json({
            status: 'fail',
            data: {
                error_code: config.ErrorCodes.Unauthorized,
            },
            message: 'You need to log in to do this operation',
        })
        return
    }
    req.session.destroy((err) => {
        if (err) {
            console.log('[Error] Failed to destroy session')
            console.log(err)
            res.status(config.HTTPCode.BadRequest).json({
                status: 'error',
                message: 'Failed to logout',
            })
        } else {
            res.clearCookie(config.cookie_name)
            res.status(config.HTTPCode.Ok).json({
                status: 'success',
                message: '[INFO] Logout successfully',
            })
        }
    })
})

module.exports = logout_router
