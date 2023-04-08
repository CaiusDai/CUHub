const express = require('express')
const session = require('express-session')
const crypto = require('crypto')
const cors = require('cors')
// Router files:
const login_router = require('./api/authentication/login.js')
const signup_router = require('./api/authentication/signup.js')

// Configuration variables:
const session_store = new session.MemoryStore()
const app = express()
const PORT = process.env.PORT || 5000
const session_key = crypto.randomBytes(20).toString('hex')

// Session definition: One-day expire; In-memory storage
app.use(
    session({
        secret: session_key,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 86400000, // One day
        },
        saveUninitialized: false,
        resave: false,
        session_store,
    })
)

app.use(express.json())
app.use(cors())

// Routers Setup:
app.use('/api/login', login_router)
app.use('/api/signup', signup_router)

// Server Start:
app.listen(PORT, () => {
    console.log(`[INFO] Server start to listen on port ${PORT}`)
})
