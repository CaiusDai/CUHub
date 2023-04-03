const process = require('process');

const {connect_db} = require('../configs/db');


async function create_table(){
    try{
        // Get connection
        const database = await connect_db();

        // Queries:
        const query = 
                    "CREATE TABLE Account ()\
                     user_id integer,\
                     "
        // Free resources
        await database.end();
    }catch(error){
        console.log(error);
    }finally{
        console.log("Connection end");
    }
}


main();