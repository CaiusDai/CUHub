const multer = require('multer')
const path = require('path')
const config = require('../configs/configs')

const image_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${config.UploadPath.images}`)
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

const upload = multer({ storage: image_storage })

module.exports = upload
