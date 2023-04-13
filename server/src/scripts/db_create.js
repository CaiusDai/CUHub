const { connect_db } = require('../configs/db')

// Queries:
const query_account =
    'CREATE TABLE Account (\
    user_id SERIAL PRIMARY KEY,\
    username TEXT NOT NULL,\
    email TEXT UNIQUE NOT NULL,\
    password TEXT NOT NULL,\
    is_blocked BOOLEAN NOT NULL)'

const query_follow_relationship =
    'CREATE TABLE FollowRelationship(\
        user1 INTEGER NOT NULL REFERENCES Account ON DELETE RESTRICT,\
        user2 INTEGER NOT NULL REFERENCES Account ON DELETE RESTRICT,\
        status BOOLEAN NOT NULL,\
        creation_time TIMESTAMP NOT NULL DEFAULT NOW(),\
        PRIMARY KEY (user1,user2),\
        CHECK (user1<>user2))'

const query_follow_index_from =
    'CREATE INDEX FollowFrom ON FollowRelationship (user1)'

const query_follow_index_by =
    'CREATE INDEX FollowBy ON FollowRelationship (user2)'

const query_gender_type =
    "CREATE TYPE GENDER AS ENUM ('male','female','others')"

const query_profile =
    "CREATE TABLE Profile(\
        user_id INTEGER PRIMARY KEY REFERENCES Account ON DELETE RESTRICT,\
        major TEXT,\
        gender GENDER DEFAULT 'others',\
        birthday DATE ,\
        college TEXT,\
        profile_photo TEXT DEFAULT 'default.jfif',\
        interests TEXT ARRAY,\
        num_of_follower INTEGER NOT NULL DEFAULT 0,\
        num_of_following INTEGER NOT NULL DEFAULT 0,\
        CHECK (num_of_follower>=0 AND num_of_following >=0 ))"

const query_admin =
    "CREATE TABLE Admin(\
        admin_id SERIAL PRIMARY KEY,\
         username TEXT NOT NULL,\
         password TEXT NOT NULL,\
         CHECK(username = 'Admin'))"

const query_announcement =
    'CREATE TABLE Announcement(\
        announcement_id SERIAL PRIMARY KEY,\
        admin_id INTEGER NOT NULL REFERENCES Admin ON DELETE RESTRICT,\
        title TEXT NOT NULL,\
        content TEXT NOT NULL,\
        creation_time TIMESTAMP NOT NULL DEFAULT NOW())'

const query_block =
    'CREATE TABLE Block(\
        block_id SERIAL PRIMARY KEY,\
        user_id INTEGER UNIQUE NOT NULL REFERENCES Account ON DELETE CASCADE,\
        admin_id INTEGER NOT NULL REFERENCES Admin ON DELETE RESTRICT,\
        start_at TIMESTAMP NOT NULL DEFAULT NOW(),\
        end_at TIMESTAMP NOT NULL CHECK (end_at > start_at) )'

const query_chat_session =
    'CREATE TABLE ChatSession(\
        session_id SERIAL PRIMARY KEY,\
        user1 INTEGER NOT NULL REFERENCES Account ON DELETE RESTRICT,\
        user2 INTEGER NOT NULL REFERENCES Account ON DELETE RESTRICT,\
        CHECK(user1<>user2),\
        UNIQUE(user1,user2))'

const query_message =
    'CREATE TABLE Message(\
        session_id INTEGER NOT NULL REFERENCES ChatSession ON DELETE CASCADE,\
        message_id SERIAL NOT NULL UNIQUE,\
        sender_id INTEGER NOT NULL REFERENCES Account ON DELETE RESTRICT,\
        content TEXT,\
        image TEXT,\
        PRIMARY KEY (session_id,message_id),\
        CHECK (image IS NOT NULL OR content IS NOT NULL))'

const query_tag_type =
    "CREATE TYPE TAG AS ENUM ('information','treehole','trading','jobseeking','academic')"
const query_post =
    "CREATE TABLE Post (\
                            post_id BIGSERIAL PRIMARY KEY ,\
                            user_id INTEGER NOT NULL REFERENCES Account ON DELETE RESTRICT,\
                            content TEXT NOT NULL,\
                            creation_time TIMESTAMP NOT NULL DEFAULT NOW(),\
                            num_like INTEGER DEFAULT 0,\
                            num_dislike INTEGER DEFAULT 0,\
                            images TEXT ARRAY,\
                            num_comment INTEGER DEFAULT 0,\
                            num_retweet INTEGER DEFAULT 0,\
                            is_anonymous BOOLEAN NOT NULL,\
                            is_public BOOLEAN NOT NULL,\
                            is_draft BOOLEAN NOT NULL,\
                            tags TAG DEFAULT 'treehole',\
                            CONSTRAINT anonymous_public_check CHECK ((NOT is_anonymous) OR is_public))"

const query_index_post = 'CREATE INDEX PostCreator ON Post(user_id)'

const query_comment =
    'CREATE TABLE Comment(\
        comment_id BIGSERIAL PRIMARY KEY,\
        user_id INTEGER NOT NULL REFERENCES Account ON DELETE RESTRICT,\
        post_id BIGINT NOT NULL REFERENCES Post ON DELETE CASCADE,\
        reply_to INTEGER NOT NULL REFERENCES Account ON DELETE RESTRICT,\
        content TEXT NOT NULL,\
        creation_time TIMESTAMP NOT NULL DEFAULT NOW(),\
        CHECK (user_id<>reply_to))'

const query_index_comment_post = 'CREATE INDEX CommentPost ON Comment (post_id)'

const query_repost =
    'CREATE TABLE Repost(\
        repost_id BIGSERIAL PRIMARY KEY,\
        comment TEXT,\
        original_post_id BIGINT NOT NULL REFERENCES Post,\
        creation_time TIMESTAMP NOT NULL DEFAULT NOW(),\
        user_id INTEGER NOT NULL REFERENCES Account ON DELETE RESTRICT)'

const query_index_repost = 'CREATE INDEX RepostBy ON Repost(user_id)'

const query_status_type = "CREATE TYPE STATUSTYPE AS ENUM ('like', 'dislike')"

const query_postaltitude =
    'CREATE TABLE PostAltitude(\
        user_id INTEGER NOT NULL REFERENCES Account ON DELETE RESTRICT,\
        post_id BIGINT NOT NULL REFERENCES Post ON DELETE CASCADE,\
        status STATUSTYPE NOT NULL,\
        PRIMARY KEY (user_id,post_id))'

const query_index_altitude_of =
    'CREATE INDEX AltitudeOf ON PostAltitude(user_id)'

function create_query_execute(database, table_name, query) {
    return database
        .query(query)
        .then(() => {
            console.log(`[INFO] Created ${table_name} successfully`)
            return Promise.resolve()
        })
        .catch((error) => {
            console.log(`[Error] Failed to create ${table_name}`)
            return Promise.reject(error)
        })
}

async function create_table() {
    try {
        // Get connection
        const database = await connect_db()
        await create_query_execute(database, 'Account', query_account)
        await create_query_execute(
            database,
            'FollowRelationship',
            query_follow_relationship
        )
        await create_query_execute(
            database,
            'Index From',
            query_follow_index_from
        )
        await create_query_execute(database, 'Index To', query_follow_index_by)
        await create_query_execute(database, 'Gender', query_gender_type)
        await create_query_execute(database, 'Profile', query_profile)
        await create_query_execute(database, 'Admin', query_admin)
        await create_query_execute(database, 'Announcement', query_announcement)
        await create_query_execute(database, 'Block', query_block)
        await create_query_execute(database, 'ChatSession', query_chat_session)
        await create_query_execute(database, 'Message', query_message)
        await create_query_execute(database, 'TAG', query_tag_type)
        await create_query_execute(database, 'Post', query_post)
        await create_query_execute(
            database,
            'Index PostCreator',
            query_index_post
        )
        await create_query_execute(database, 'Comment', query_comment)
        await create_query_execute(
            database,
            'Index CommentPost',
            query_index_comment_post
        )
        await create_query_execute(database, 'Repost', query_repost)
        await create_query_execute(
            database,
            'Index RepostBy',
            query_index_repost
        )
        await create_query_execute(database, 'Status Type', query_status_type)
        await create_query_execute(database, 'PostAltitude', query_postaltitude)
        await create_query_execute(
            database,
            'Index AltitudeOf',
            query_index_altitude_of
        )
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
