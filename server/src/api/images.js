const express = require('express')
const path = require('path')
const fs = require('fs')
const config = require('../configs/configs')
const { avatar_upload } = require('../util/upload_controller')
const HTTPCode = config.HTTPCode
const image_router = express.Router()
const avatar_path = config.UploadPath.avatars
const { connect_db } = require('../configs/db')
//const post_path = config.UploadPath.posts

function getContentType(image_path) {
    // Set the content type based on the image file extension
    const extension = path.extname(image_path).toLowerCase()
    let contentType
    switch (extension) {
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg'
            break
        case '.png':
            contentType = 'image/png'
            break
        case '.gif':
            contentType = 'image/gif'
            break
        default:
            contentType = 'application/octet-stream'
            break
    }
    return contentType
}

// Upload an avatar
image_router.put('/avatars/me', avatar_upload.single('images'), (req, res) => {
    // Check
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
    // Upload
    const image_name = req.file.filename
    const user_id = req.session.uid

    // Delete the old avatar
    const get_old_query = `SELECT profile_photo FROM Profile WHERE user_id = ${user_id}`
    const upload_new_query = `UPDATE profile SET profile_photo = '${image_name}' WHERE user_id = ${user_id}`
    console.log('Start updating avatar')
    console.log(get_old_query, upload_new_query)
    // Insert the new avatar
    connect_db().then((database) => {
        database.query(get_old_query).then((result) => {
            const image_path = path.join(
                config.UploadPath.avatars,
                result.rows[0].profile_photo
            )
            // Delete the image
            fs.unlink(image_path, (err) => {
                if (err) {
                    console.error(err)
                } else {
                    console.log(`Successfully deleted ${path}`)
                }
            })
        })

        database.query(upload_new_query).then(() => {
            // Return success
            res.status(HTTPCode.Ok).json({
                status: 'success',
                data: {},
                message: 'Avatar uploaded',
            })
            console.log('Avatar updated')
        })
    })
})

// Get an avatar
image_router.get('/avatars/:path', (req, res) => {
    // Check
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
    const image_path = path.join(avatar_path, req.params.path)
    //Check if the image exists or not:
    fs.access(image_path, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`Error reading image file ${image_path}:`, err)
            res.status(HTTPCode.NotFound).send('Avatar not found')
            return
        }

        const content_type = getContentType(image_path)
        res.status(HTTPCode.Ok).sendFile(
            image_path,
            {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': content_type,
                    'Cache-Control': 'max-age=3600', // Cache the image for 1 hour
                },
            },
            (error) => {
                if (error) {
                    console.error('Error sending avatar:', error)
                    res.status(HTTPCode.BadRequest).send('Error sending avatar')
                } else {
                    console.log('Avatar sent successfully.')
                }
            }
        )
    })
})

module.exports = image_router
