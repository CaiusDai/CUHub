// app.get('/api/signup', async (req, res) => {
//     //Get the input data from the request
//     const username = req.query.username
//     const email = req.query.email
//     const password = req.query.password
//     //Format the query
//     const query = `INSERT INTO Account VALUES (DEFAULT,${username},${email},${password},FALSE)`
//     //Operation on db
//     const database = await connect_db()
//     await database.query(query)
//     //Send the respond
//     res.status(200).send()
// })
