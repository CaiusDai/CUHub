const multer = require('multer')
const path = require('path')
const config = require('../configs/configs')

const image_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${config.UploadPath.posts}`)
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

const avatar_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${config.UploadPath.avatars}`)
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

const image_upload = multer({ storage: image_storage })
const avatar_upload = multer({ storage: avatar_storage })
module.exports = {
    image_upload,
    avatar_upload,
}
