const process = require('process');

const {connect_db} = require('../configs/db');


async function create_table(){
    try{
        // Get connection
        const database = await connect_db();

        // Queries:
        const query_account = "CREATE TABLE Account (\
                        user_id SERIAL PRIMARY KEY,\
                        user_name TEXT NOT NULL,\
                        password TEXT NOT NULL,\
                        is_blocked BOOLEAN NOT NULL)";
        await database.query(query_account,[],(error,res)=>{
            if(error){
                console.log("[Error] Failed to create table Account.");
                console.log(error);
            }else{
                console.log("[INFO] Table Account creation succeed.");
                console.log(res);
            }
        })
    }catch(error){
        console.log(error);
    }finally{
        console.log("[INFO] Connection end");
    }
}


create_table();