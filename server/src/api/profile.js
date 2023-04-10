const express = require('express')
const config = require('../configs/configs.js')

const { connect_db } = require('../configs/db.js')

const HTTPCodes = config.HTTPCode
const profile_router = express.Router()

// Get : Get the profile of oneself
// Post : Create the profile for oneself
// Delete : NOT DEFINED
// Update : Edit the profile
'/profiles/me/:id'

// Get : Get the profile of a user with <id>
// Others: NOT DEFINED
'/profiles/owner/:id'

module.exports = profile_router