const { create } = require('domain');
const process = require('process');

const { connect_db } = require('../configs/db');

//Queries:

const insert_account = (username, password, is_blocked) => {
    const query_account = `INSERT INTO Account,\
    VALUES(DEFAULT, '${username}', '${password}', ${is_blocked})`;
    return query_account;
}

const insert_follow_relationship = (user1, user2, status) => {
    const query_follow = `INSERT INTO FollowRelationship,\
                        VALUES(${user1},${user2},${status},DEFAULT)`;
    return query_follow;
}

const insert_profile = (user_id, major, gender, birthday, college, profile_photo, interests, num_of_follower, num_of_following) => {
    const query_profile = `INSERT INTO Profile,\
                        VALUES(${user_id},'${major}','${gender}','${birthday}','${college}',${profile_photo},'${interests}',${num_of_follower},${num_of_following})`;
    return query_profile;
}

const insert_admin = (username, password) => {
    const query_admin = `INSERT INTO Admin,\
                        VALUES(DEFAULT,'${username}','${password}')`;
    return query_admin;
}

const insert_announcement = (admin_id, content) => {
    const query_announcement = `INSERT INTO Announcement,\
                            VALUES(DEFAULT,${admin_id},'${content}',DEFAULT)`;
    return query_announcement;
}
const insert_block = (user_id, admin_id, end_at) => {
    const query_block = `INSERT INTO Block,\
                        VALUES(DEFAULT,${user_id},${admin_id},DEFAULT,'${end_at}')`;
    return query_block;
}

const insert_post = (user_id, content, num_like, num_dislike, images, num_comment, num_retweet, is_anonymous, is_public, is_draft, tags) => {
    const query_post = `INSERT INTO Profile,\
                        VALUES(DEFAULT,${user_id},'${content}',DEFAULT,${num_like},${num_dislike},${images},${num_comment},${num_retweet},${is_anonymous},${is_public},${is_draft},'${tags}')`;
    return query_post;
}

const insert_follow_comment = (user_id, post_id, reply_to, content,) => {
    const query_comment = `INSERT INTO FollowRelationship,\
                        VALUES(DEFAULT,${user_id},${post_id},${reply_to},'${content}',DEFAULT)`;
    return query_comment;
}

const insert_follow_repost = (comment, original_post_id, user_id) => {
    const query_repost = `INSERT INTO FollowRelationship,\
                        VALUES(DEFAULT,'${comment}',${original_post_id},${user_id})`;
    return query_repost;
}


const insert_postaltitude = (user_id, post_id, status) => {
    const query_postaltitude = `INSERT INTO FollowRelationship,\
                        VALUES(${user_id},${post_id},'${status}')`;
    return query_postaltitude;
}


function create_query_execute(database, table_name, query) {
    return database
        .query(query)
        .then(() => {
            console.log(`[INFO] Insert ${table_name} successfully`)
            return Promise.resolve()
        })
        .catch((error) => {
            console.log(`[Error] Failed to Insert ${table_name}`)
            return Promise.reject(error)
        })
}

async function create_table() {
    try {
        // Get connection
        const database = await connect_db()
        //Insert account information
        await create_query_execute(database, 'Account', insert_account('TAN', 'tanruijie', true))
        await create_query_execute(database, 'Account', insert_account('DAI', 'daizijie', false))
        await create_query_execute(database, 'Account', insert_account('SU', 'surunlong', false))
        //Insert follow relationship
        await create_query_execute(database, 'FollowRelationship', insert_follow_relationship(1, 2, true))
        await create_query_execute(database, 'FollowRelationship', insert_follow_relationship(1, 3, true))
        await create_query_execute(database, 'FollowRelationship', insert_follow_relationship(2, 3, true))

        //Insert profile relationship
        await create_query_execute(database, 'Profile', insert_profile(1, 'cs', 'male', '2001-02-05', 'CUHK', 'NULL', "{'sing','jump','rap'}", 0, 2))
        await create_query_execute(database, 'Profile', insert_profile(2, 'cs', 'male', '2001-02-05', 'CUHK', 'NULL', "{'sing','jump','rap'}", 1, 1))
        await create_query_execute(database, 'Profile', insert_profile(3, 'cs', 'male', '2001-02-05', 'CUHK', 'NULL', "{'sing','jump','rap'}", 2, 0))

        //Insert admin 
        await create_query_execute(database, 'Admin', insert_admin('Dad', 'yes'));
        await create_query_execute(database, 'Admin', insert_admin('Mom', 'yes'));
        await create_query_execute(database, 'Admin', insert_admin('Son', 'yes'));


        //Insert announcement
        await create_query_execute(database, 'Announcement', insert_announcement(1, 'I am god'));
        await create_query_execute(database, 'Announcement', insert_announcement(2, 'I am god too'));
        await create_query_execute(database, 'Announcement', insert_announcement(3, 'I am god also'));
       
        //Insert block
        await create_query_execute(database, 'Block', insert_block(1,1,'2023-08-14 04:05:06'));
        
        await create_query_execute(database, 'ChatSession', query_chat_session)
        await create_query_execute(database, 'Message', query_message)
        await create_query_execute(database, 'TAG', query_tag_type)
        await create_query_execute(database, 'Post', query_post)
        await create_query_execute(database, 'Comment', query_comment)
        await create_query_execute(database, 'Repost', query_repost)
        await create_query_execute(database, 'Status Type', query_status_type)
        await create_query_execute(database, 'PostAltitude', query_postaltitude)
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
}

create_table()
    .then(() => {
        console.log('[INFO] Creation succeed')
    })
    .catch((error) => {
        console.log('[Error] Failed to create all tables')
        console.log(error)
    })







