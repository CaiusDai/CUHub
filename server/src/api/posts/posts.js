const express = require('express')
const { connect_db } = require('../../configs/db')
const config = require('../../configs/configs')
const HTTPCode = config.HTTPCode
const post_router = express.Router()

// Get all posts
post_router.get('/all', (req, res) => {
    // Check identity:
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

    connect_db()
        .then((database) => {
            const query =
                'SELECT title,content FROM Announcement ORDER BY creation_time DESC'
            return database.query(query)
        })
        .then((db_result) => {
            const announcements = db_result.rows.map((announcement) => {
                return {
                    title: announcement.title,
                    content: announcement.content,
                }
            })
            res.status(HTTPCode.Ok).json({
                status: 'success',
                data: {
                    announcements: announcements,
                },
                message: '[INFO] Sent all annoucements already',
            })
        })
        .catch((err) => {
            console.error(`[Error] Failed to send annoucement.\n Error: ${err}`)
            res.status(HTTPCode.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })
        })
})

// Get all Firends' Post
post_router.get('/friends', (req, res) => {})
module.exports = post_router
