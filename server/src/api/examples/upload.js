const express = require('express')
const upload_router = express.Router()
const path = require('path')
const upload = require('../../util/upload_controller')

// Example for uploading one image
upload_router.post('/upload', upload.single('image'), (req, res) => {
    console.log('Uploading...')
    // Get the file name
    const file_name = req.file.filename
    // Query operation should happen here
    // Send result to the front end
    res.send(`Image ${file_name}uploaded`)
})

// Example for uploading multiple images:
upload_router.post('/uploads', upload.array('images', 10), (req, res) => {
    const uploadedFiles = req.files
    console.log(`Uploaded ${uploadedFiles.length} file(s):`)
    uploadedFiles.forEach((file) => {
        const file_name = file.filename
        console.log(`File name : ${file_name}`)
    })
    // Query operation: Store the files:

    res.send('Image(s) uploaded')
})

// Example for sending images:
upload_router.get('/download', (req, res) => {
    const imagePath = path.join(__dirname, '../../../upload/images/1681118427552.png')
    res.status(200).sendFile(
        imagePath,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'image/png',
            },
        },
        (error) => {
            if (error) {
                console.error('Error sending file:', error)
                res.status(500).send('Error sending file')
            } else {
                console.log('File sent successfully.')
            }
        }
    )
})

module.exports = upload_router
