const process = require('process');

const {connect_db} = require('../configs/db');

async function delete_table(){
    try{
        // Get connection
        const database = await connect_db();

        // Queries:
        const query_account = "DROP TABLE Account";
                        
        await database.query(query_account,(error,res)=>{
            if(error){
                console.log("[Error] Failed to drop table Account.");
                console.log(error);
            }else{
                console.log("[INFO] Deletion succeed.");
                console.log(res);
            }
        });
    }catch(error){
        console.log(error);
    }finally{
        console.log("[INFO] Connection end");
    }
}


delete_table();