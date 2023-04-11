const express = require('express')
const config = require('../configs/configs.js')


const { connect_db } = require('../configs/db.js')

const HTTPCodes = config.HTTPCode
const profile_router = express.Router()

// //Create instance of bodyParser
// const jsonParser = bodyParser.json()
// profile_router.use(jsonParser)

//Get personal profile, no input needed
profile_router.get('/', (req, res) => {
    const user_id = req.session.uid

    const query_get_profile = `SELECT username,major,gender,birthday,college,interests,email FROM Profile,Account WHERE Profile.user_id = Account.user_id AND Profile.user_id = ${user_id}`
    //Get username and photo
    connect_db()
    .then((database)=>database.query(query_get_profile))
        .then((db_result) => {
            const result = db_result.rows[0]
            res.status(HTTPCodes.Ok).json({
                status: 'success',
                data: {
                    profile: result,
                },
                message: '[INFO] Successfully get profile',
            })

        })
        .catch((err) => {
            console.log(
                'Error in getting the profile of current user and the error is :',
                err
            )
            res.status(HTTPCodes.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })
        })
})

//Updating
profile_router.put('/',(req,res)=>{


    const {username, major, gender, birthday, college,interests} = req.body
    // const profile_photo = req.body.profile_photo//Needs to be solved using the way of uploading photo
    const user_id = req.session.uid
    const query_edit_profile = `UPDATE Profile SET major = '${major}', gender = '${gender}',birthday = ${birthday}, college = '${college}',interests = ARRAY${interests} WHERE user_id = ${user_id}`
    connect_db()
        .then((database)=>{database.query(query_edit_profile)})
        .then((db_result)=>{
            res.status(HTTPCodes.Ok).json({
                status: 'success',
                message: '[INFO] Edit profile successfully',
                //No data returned
            })

        })
        .catch((err)=>{
            console.log("[ERROR]: error in updating profile, the error is: ",err)
            res.status(HTTPCodes.BadRequest).json({
                status: 'fail',
                message: '[INFO] Fail to update profile',
            })
        })

})

//View other profile, need other's user_id
profile_router.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id

    //Get username and profile photo of this user
    const query_get_profile = `SELECT username,major,gender,birthday,college,interests FROM Profile WHERE user_id = ${user_id}`
    //Get username and photo
    connect_db()
    .then((database)=>database.query(query_get_profile))
        .then((db_result) => {
            const result = db_result.rows[0]
            res.status(HTTPCodes.Ok).json({
                status: 'success',
                data: {
                    profile: result,
                },
                message: '[INFO] Get profile successfully',
            })

        })
        .catch((err) => {
            console.log(
                'Error in getting the profile of other user and the error is :',
                err
            )
            res.status(HTTPCodes.BadRequest).json({
                status: 'error',
                message: '[Error] Invalid query format',
            })
        })
})
// Get : Get the profile of oneself
// Post : Already created when a user sign up successfully
// Delete : NOT DEFINED
// Update : Edit the profile
// '/profiles/me/:id'

// Get : Get the profile of a user with <id>
// Others: NOT DEFINED
// '/profiles/owner/:id'

module.exports = profile_router