const express = require('express')

const server = express()

const PORT = process.env.PORT || 4001

// Server Start:
server.listen(PORT, () => {
    console.log(`[INFO] Server start to listen on port ${PORT}`)
})
