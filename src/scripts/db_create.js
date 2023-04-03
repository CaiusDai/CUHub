const process = require('process');

const {connect_db} = require('../configs/db');


// Queries:
const query_account = "CREATE TABLE Account (\
    user_id SERIAL PRIMARY KEY,\
    username TEXT NOT NULL,\
    password TEXT NOT NULL,\
    is_blocked BOOLEAN NOT NULL)";

const query_follow_relationship ="CREATE TABLE FollowRelationship(\
                                user1 INTEGER NOT NULL REFERENCES Account,\
                                user2 INTEGER NOT NULL REFERENCES Account,\
                                status BOOLEAN NOT NULL,\
                                creation_time TIMESTAMP NOT NULL DEFAULT NOW(),\
                                PRIMARY KEY (user1,user2))";

const query_gender_type = "CREATE TYPE GENDER AS ENUM ('male','female','others')";

const query_profile = "CREATE TABLE Profile(\
                        user_id INTEGER PRIMARY KEY REFERENCES Account,\
                        major TEXT,\
                        gender GENDER DEFAULT 'others',\
                        birthday DATE ,\
                        college TEXT,\
                        profile_photo BYTEA ,\
                        interests TEXT ARRAY,\
                        num_of_follower INTEGER NOT NULL DEFAULT 0,\
                        num_of_following INTEGER NOT NULL DEFAULT 0,\
                        CHECK (num_of_follower>=0 AND num_of_following >=0 ))";

const query_admin = "CREATE TABLE Admin(\
                     admin_id SERIAL PRIMARY KEY,\
                     username TEXT NOT NULL,\
                     password TEXT NOT NULL)";

const query_announcement = "CREATE TABLE Announcement(\
                            announcement_id SERIAL PRIMARY KEY,\
                            admin_id INTEGER NOT NULL REFERENCES Admin,\
                            content TEXT NOT NULL,\
                            creation_time TIMESTAMP NOT NULL DEFAULT NOW())";

const query_block = "CREATE TABLE Block(\
                     block_id SERIAL PRIMARY KEY,\
                     user_id INTEGER NOT NULL REFERENCES Account,\
                     admin_id INTEGER NOT NULL REFERENCES Admin,\
                     start_at TIMESTAMP NOT NULL DEFAULT NOW(),\
                     end_at TIMESTAMP NOT NULL CHECK (end_at > start_at) )";

const query_chat_session ="CREATE TABLE ChatSession(\
                            session_id SERIAL PRIMARY KEY,\
                            user1 INTEGER NOT NULL REFERENCES Account,\
                            user2 INTEGER NOT NULL REFERENCES Account,\
                            CHECK(user1<>user2))";

const query_message = "CREATE TABLE Message(\
                        session_id INTEGER NOT NULL REFERENCES ChatSession,\
                        message_id SERIAL NOT NULL,\
                        sender_id INTEGER NOT NULL REFERENCES Account,\
                        content TEXT NOT NULL,\
                        PRIMARY KEY (session_id,message_id))";


function create_query_execute(database,table_name,query){
    return database.query(query)
                   .then((result)=>{
                    console.log(`[INFO] Created ${table_name} successfully`);
                    return Promise.resolve();
                   })
                   .catch((error)=>{
                    console.log(`[Error] Failed to create ${table_name}`);
                    return Promise.reject(error);
                   })
}


async function create_table(){
    try{
        // Get connection
        const database = await connect_db();
        await create_query_execute(database,'Account',query_account);
        await create_query_execute(database,'FollowRelationship',query_follow_relationship);
        await create_query_execute(database,'Gender',query_gender_type);
        await create_query_execute(database,'Profile',query_profile);
        await create_query_execute(database,'Admin',query_admin);
        await create_query_execute(database,'Announcement',query_announcement);
        await create_query_execute(database,'Block',query_block);
        await create_query_execute(database,'ChatSession',query_chat_session);
        await create_query_execute(database,'Message',query_message);
        return Promise.resolve();
    }catch(error){
        return Promise.reject(error);
    }
}


create_table().then(()=>{
    console.log("[INFO] Creation succeed");
    process.exit(0);
}).catch((error)=>{
    console.log("[Error] Failed to create all tables");
    console.log(error);
    process.exit(-1);
})