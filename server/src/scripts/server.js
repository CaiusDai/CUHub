const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

const { connect_db } = require('../configs/db')

// app.use(express.json);
app.use(cors())

app.get('/api/login', async (req, res) => {
    //Get the input data from the request
    const username = req.query.username
    const password = req.query.password
    //Format the query
    const query = `SELECT COUNT(*) FROM Account WHERE username = '${username}' AND password = '${password}'`
    //Operation on db
    const database = await connect_db()
    await database
        .query(query)
        .then((result) => {
            console.log(`[INFO] Retrieve Account successfully`)
            //count = 0 means no such user, 1 means user exist
            if (result.rows[0].count == 1) {
                const data = { query_result: true }
                res.status(200).send(data)
                console.log('Log in successful')
            } else {
                const data = { query_result: false }
                res.status(401).send(data)
            }
            return Promise.resolve()
        })
        .catch((error) => {
            console.log(`[Error] Failed to retrieve Account`)
            return Promise.reject(error)
        })
})

app.get('/api/signup', async (req, res) => {
    //Get the input data from the request
    const username = req.query.username
    const email = req.query.email
    const password = req.query.password
    //Format the query
    const query = `INSERT INTO Account VALUES (DEFAULT,${username},${email},${password},FALSE)`
    //Operation on db
    const database = await connect_db()
    await database.query(query)
    //Send the respond
    res.status(200).send()
})

//Handle the initial page of the localhost
app.get('/', (req, res) => {
    console.log('Yes! receive the first request')
    res.send('Hello!')
})

app.listen(port, () => {
    console.log(`Server is listening at PORT:${port}`)
})
