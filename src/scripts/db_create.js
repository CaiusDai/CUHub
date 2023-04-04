const process = require('process');

const { connect_db } = require('../configs/db');


//Queries

const query_account = "CREATE TABLE Account (\
    user_id SERIAL PRIMARY KEY,\
    user_name TEXT NOT NULL,\
    password TEXT NOT NULL,\
    is_blocked BOOLEAN NOT NULL)";

const query_post = "CREATE TABLE Post (\
    post_id BIGSERIAL PRIMARY KEY ,\
    user_id INTEGER NOT NULL REFERENCES Account,\
    content TEXT NOT NULL,\
    creation_time TIMESTAMP[(p)][without time zone] NOT NULL DEFAULT NOW,\
    num_like INTEGER NOT NULL,\
    num_dislike INTEGER NOT NULL,\
    images VARCHAR NOT NULL,\
    num_comment INTEGER NOT NULL,\
    num_retweet INTEGER NOT NULL,\
    is_anonymous BOOLEAN NOT NULL,\
    is_public BOOLEAN NOT NULL,\
    is_draft BOOLEAN NOT NULL,\
    tags TEXT[] NOT NULL)";

const query_comment = "CREATE TABLE Comment(\
                    comment_id SERIAL PRIMARY KEY,\
                    user_id INTEGER NOT NULL REFERENCES Account,\
                    post_id BIGINT NOT NULL REFERENCES Post,\
                    reply_to INTEGER NOT NULL REFERENCES Account,\
                    content TEXT NOT NULL,\
                    creation_time TIMESTAMP[(p)][without time zone] NOT NULL DEFAULT NOW)";

const query_repost = "CREATE TABLE Repost(\
                repost_id SERIAL PRIMARY KEY,\
                comment TEXT NOT NULL,\
                original_post_id BIGINT NOT NULL REFERENCES Post,\
                user_id INTEGER NOT NULL REFERENCES Account)";

const query_postaltitude_part1="CREATE TYPE flag AS ENUM ('like', 'dislike')";

const query_postaltitude_part2 = "CREATE TABLE Postaltitude(\
                    user_id INTEGER PRIMARY KEY,\
                    post_id BIGINT REFERENCES Post,\
                    status flag NOT NULL)";



async function create_table() {
    try {
        // Get connection
        const database = await connect_db();

        await database.query(query_account, [], (error, res) => {
            if (error) {
                console.log("[Error] Failed to create table Account.");
                console.log(error);
            } else {
                console.log("[INFO] Table Account creation succeed.");
                console.log(res);
            }
        }).then(async () => {
            try {
                await database.query(query_post, (error, res) => {
                    if (error) {
                        console.log("[Error] Failed to create table Post.");
                        console.log(error);
                    }
                    else {
                        console.log("[INFO] Table Post creation succeed.");
                        console.log(res);
                    }
                })
            }
            catch (error) {
                console.log(error);
            }

        })
    } catch (error) {
        console.log(error);
    } finally {
        console.log("[INFO] Connection end");
    }
}


create_table();