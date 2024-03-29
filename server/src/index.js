// Dependencies
const express = require('express')
const session = require('express-session')
const crypto = require('crypto')
const cors = require('cors')

// Project variables
const config = require('./configs/configs')

// Router files: (TODO: Better format)
const login_router = require('./api/authentication/login.js')
const signup_router = require('./api/authentication/signup.js')
const block_router = require('./api/admin/block.js')
const admin_router = require('./api/admin/admin.js')
const announcement_router = require('./api/admin/announcement')
const logout_router = require('./api/authentication/logout.js')
const example_router = require('./api/examples/upload')
const chat_router = require('./api/chatsessions.js')
const profile_router = require('./api/profile.js')
const post_router = require('./api/posts/posts')
const search_router = require('./api/search')
const image_router = require('./api/images')
const follow_router = require('./api/follow')

// Configuration variables:
const session_store = new session.MemoryStore()
const app = express()
const session_key = crypto.randomBytes(20).toString('hex')
const cors_options = {
    origin: function (origin, callback) {
        if (origin.startsWith('http://localhost')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}

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
app.use('/avatar_images', express.static(config.UploadPath.avatars))
app.use('/post_images', express.static(config.UploadPath.posts))
app.use(express.json())
app.use(cors(cors_options))

// Routers Setup:
app.use('/api/login', login_router)
app.use('/api/logout', logout_router)
app.use('/api/signup', signup_router)
app.use('/api/admin/block', block_router)
app.use('/api/admin', admin_router)
app.use('/api/example', example_router)
app.use('/api/chat', chat_router)
app.use('/api/profiles', profile_router)
app.use('/api/announcements', announcement_router)
app.use('/api/posts', post_router)
app.use('/api/search', search_router)
app.use('/api/images', image_router)
app.use('/api/follows', follow_router)

// Server Start:
app.listen(config.ListenPort, () => {
    console.log(`[INFO] Server start to listen on port ${config.ListenPort}`)
})
