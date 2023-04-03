const process = require('process');

const {connect_db} = require('../configs/db');

 // Queries:
 const query="DROP TABLE IF EXISTS Message;\
            DROP TABLE IF EXISTS ChatSession;\
            DROP TABLE IF EXISTS Block;\
            DROP TABLE IF EXISTS Announcement;\
            DROP TABLE IF EXISTS Admin;\
            DROP TABLE IF EXISTS Profile;\
            DROP TABLE IF EXISTS FollowRelationship;\
            DROP TABLE IF EXISTS Account;\
            DROP TYPE IF EXISTS GENDER;";


async function delete_table(){
    try{
        // Get connection
        const database = await connect_db();

       
                        
        return database.query(query)
                      .then((result)=>{
                        console.log("[INFO] All Tables dropped successfully");
                        return result;
                      })
                      .catch((error)=>{
                        console.log("[Error] Error occurred during table deletion");
                        return error;
                      })
        
    }catch(error){
        console.log(error);
    }
}


delete_table().then((result)=>{
    console.log("[INFO] Deletion end.");
    process.exit(0);
}).catch((error)=>{
    console.log("[Error] Deletion failed");
    process.exit(-1);
})