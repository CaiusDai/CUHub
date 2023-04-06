const express = require('express');
const app = express();
const port =5000;

const { connect_db } = require('../configs/db')


// app.use(express.json);


app.get('/api/login',async(req,res,next)=>{

    //Get the input data from the request
    const username = req.query.username
    const password = req.query.password
    //Format the query
    const query = `SELECT COUNT(*) FROM Account WHERE username = ${username} AND password = ${password}`
    //Operation on db
    const database = await connect_db()
    await database.query(query)
    .then((result) => {
        console.log(`[INFO] Retrieve Account successfully`)
        //count = 0 means no such user, 1 means user exist
        if(result.rows[0].count == 1)
        res.status(200).send(true);
        else
        res.status(404).send(false);
        return Promise.resolve()
    })
    .catch((error) => {
        console.log(`[Error] Failed to retrieve Account`)
        return Promise.reject(error)
    })

})

app.get('/api/signup',async(req,res,next)=>{

    //Get the input data from the request
    const username = req.query.username 
    const email = req.query.email
    const password = req.query.password
    //Format the query
    const query = `INSERT INTO Account VALUES (DEFAULT,${username},${email},${password},FALSE)`
    //Operation on db
    const database = await connect_db()
    const result = await database.query(query)
    //Send the respond
    res.status(200).send()
})

//Handle the initial page of the localhost
app.get('/',(req,res)=>{
    console.log("Yes! receive the first request")
    res.send("Hello!")
});

app.listen(port,()=>{
    console.log(`Server is listening at PORT:${port}`)
});
