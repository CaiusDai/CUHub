const { connect_db } = require('../configs/db')
const util = require('../util/utils')
//Queries:

const insert_account = (username, email, password, is_blocked) => {
    const query_account = `INSERT INTO Account\
    VALUES(DEFAULT,'${username}', '${email}','${password}', ${is_blocked})`
    return query_account
}

const insert_follow_relationship = (user1, user2, status) => {
    const query_follow = `INSERT INTO FollowRelationship \
                        VALUES(${user1},${user2},${status},DEFAULT)`
    return query_follow
}

const insert_profile = (
    user_id,
    major,
    gender,
    birthday,
    college,
    profile_photo,
    interests,
    num_of_follower,
    num_of_following
) => {
    const query_profile = `INSERT INTO Profile \
                        VALUES(${user_id},'${major}','${gender}','${birthday}','${college}','${profile_photo}',ARRAY['${interests[0]}','${interests[1]}','${interests[2]}'],${num_of_follower},${num_of_following})`
    return query_profile
}

const insert_admin = (username, password) => {
    const query_admin = `INSERT INTO Admin \
                        VALUES(DEFAULT,'${username}','${password}')`
    return query_admin
}

const insert_announcement = (admin_id, content, title) => {
    const query_announcement = `INSERT INTO Announcement \
                            VALUES(DEFAULT,${admin_id},'${title}','${content}',DEFAULT)`
    return query_announcement
}
const insert_block = (user_id, admin_id, end_at) => {
    const query_block = `INSERT INTO Block \
                        VALUES(DEFAULT,${user_id},${admin_id},DEFAULT,'${end_at}')`
    return query_block
}

const insert_post = (
    user_id,
    content,
    num_like,
    num_dislike,
    images,
    num_comment,
    num_retweet,
    is_anonymous,
    is_public,
    is_draft,
    tags
) => {
    const query_post = `INSERT INTO Post \
                        VALUES(DEFAULT,${user_id},'${content}',DEFAULT,${num_like},${num_dislike},${images},${num_comment},${num_retweet},${is_anonymous},${is_public},${is_draft},'${tags}')`
    return query_post
}

const insert_comment = (user_id, post_id, reply_to, content) => {
    const query_comment = `INSERT INTO Comment \
                        VALUES(DEFAULT,${user_id},${post_id},${reply_to},'${content}',DEFAULT)`
    return query_comment
}

const insert_repost = (comment, original_post_id, user_id) => {
    const query_repost = `INSERT INTO Repost \
                        VALUES(DEFAULT,'${comment}',${original_post_id},DEFAULT,${user_id})`
    return query_repost
}

const insert_postaltitude = (user_id, post_id, status) => {
    const query_postaltitude = `INSERT INTO PostAltitude \
                        VALUES(${user_id},${post_id},'${status}')`
    return query_postaltitude
}

const insert_chat = (user_1, user_2) => {
    const query_chat = `INSERT INTO ChatSession \
                        VALUES(DEFAULT,${user_1},${user_2})`
    return query_chat
}

const insert_message = (session_id, sender_id, content) => {
    const query_message = `INSERT INTO Message (session_id, sender_id, content) VALUES (${session_id}, ${sender_id}, '${content}')`
    return query_message
}

function create_query_execute(database, table_name, query) {
    return database
        .query(query)
        .then(() => {
            console.log(`[INFO] Insert one data of ${table_name} successfully`)
            return Promise.resolve()
        })
        .catch((error) => {
            console.log(`[Error] Failed to Insert ${table_name}`)
            return Promise.reject(error)
        })
}

async function insert_data() {
    try {
        // Get connection
        const database = await connect_db()
        //Insert account information
        await create_query_execute(
            database,
            'Account',
            insert_account('TAN', 'hahaha@outlook.com', 'tanruijie', true)
        )
        await create_query_execute(
            database,
            'Account',
            insert_account('DAI', 'hehehe@outlook.com', 'daizijie', false)
        )
        await create_query_execute(
            database,
            'Account',
            insert_account('SU', 'xixixi@outlook.com', 'surunlong', false)
        )
        //Insert follow relationship
        await create_query_execute(
            database,
            'FollowRelationship',
            insert_follow_relationship(1, 2, true)
        )
        await create_query_execute(
            database,
            'FollowRelationship',
            insert_follow_relationship(2, 1, true)
        )
        await create_query_execute(
            database,
            'FollowRelationship',
            insert_follow_relationship(1, 3, true)
        )
        await create_query_execute(
            database,
            'FollowRelationship',
            insert_follow_relationship(3, 1, true)
        )
        await create_query_execute(
            database,
            'FollowRelationship',
            insert_follow_relationship(2, 3, true)
        )

        //Insert profile relationship
        await create_query_execute(
            database,
            'Profile',
            insert_profile(
                1,
                'cs',
                'male',
                '2001-02-05',
                'CUHK',
                '1681304315539.jfif',
                ['sing', 'jump', 'rap'],
                0,
                2
            )
        )
        await create_query_execute(
            database,
            'Profile',
            insert_profile(
                2,
                'cs',
                'male',
                '2001-02-05',
                'CUHK',
                '1681304354942.jfif',
                ['sing', 'jump', 'rap'],
                1,
                1
            )
        )
        await create_query_execute(
            database,
            'Profile',
            insert_profile(
                3,
                'cs',
                'male',
                '2001-02-05',
                'CUHK',
                '1681304358529.jfif',
                ['sing', 'jump', 'rap'],
                2,
                0
            )
        )

        //Insert admin
        await create_query_execute(
            database,
            'Admin',
            insert_admin('Admin', 'cuhubadmin')
        )

        //Insert announcement
        await create_query_execute(
            database,
            'Announcement',
            insert_announcement(1, 'I am god', 'Announcement 1')
        )
        await create_query_execute(
            database,
            'Announcement',
            insert_announcement(1, 'I am god too', 'Announcement 2')
        )
        await create_query_execute(
            database,
            'Announcement',
            insert_announcement(1, 'I am god also', 'Announcement 3')
        )

        //Insert block
        await create_query_execute(
            database,
            'Block',
            insert_block(1, 1, '2023-08-14 04:05:06')
        )

        //Insert chat session
        await create_query_execute(database, 'ChatSession', insert_chat(1, 2))
        await create_query_execute(database, 'ChatSession', insert_chat(1, 3))
        await create_query_execute(database, 'ChatSession', insert_chat(2, 3))

        //Insert message
        await create_query_execute(
            database,
            'Message',
            insert_message(1, 1, 'See you tomorrow!')
        )
        await create_query_execute(
            database,
            'Message',
            insert_message(1, 2, 'OK!')
        )
        await create_query_execute(
            database,
            'Message',
            insert_message(2, 1, 'Miss you very much!')
        )

        await util.timeoutPromise(1000)

        //Insert post
        await create_query_execute(
            database,
            'Post',
            insert_post(
                1,
                'I am so lucky!',
                1,
                0,
                'NULL',
                3,
                1,
                false,
                true,
                false,
                'treehole'
            )
        )

        await util.timeoutPromise(1000)

        await create_query_execute(
            database,
            'Post',
            insert_post(
                2,
                'I am so happy!',
                1,
                0,
                'NULL',
                0,
                0,
                false,
                true,
                false,
                'academic'
            )
        )
        await util.timeoutPromise(1000)

        await create_query_execute(
            database,
            'Post',
            insert_post(
                3,
                'I am so crazy!',
                1,
                0,
                'NULL',
                0,
                0,
                false,
                true,
                false,
                'trading'
            )
        )

        //Insert comment
        await create_query_execute(
            database,
            'Comment',
            insert_comment(3, 1, 1, 'Hahaha')
        )
        await util.timeoutPromise(1000)
        await create_query_execute(
            database,
            'Comment',
            insert_comment(2, 1, 3, 'Yayaya')
        )
        await util.timeoutPromise(1000)
        await create_query_execute(
            database,
            'Comment',
            insert_comment(1, 1, 2, 'Lalala')
        )

        //Insert repost
        await util.timeoutPromise(1000)
        await create_query_execute(
            database,
            'Repost',
            insert_repost('See!', 1, 3)
        )
        await util.timeoutPromise(1000)
        await create_query_execute(
            database,
            'Repost',
            insert_repost('Great!', 2, 1)
        )
        await util.timeoutPromise(1000)
        await create_query_execute(
            database,
            'Repost',
            insert_repost('Great!', 3, 1)
        )
        //Insert Postaltitude
        await create_query_execute(
            database,
            'PostAltitude',
            insert_postaltitude(1, 2, 'like')
        )
        await create_query_execute(
            database,
            'PostAltitude',
            insert_postaltitude(2, 3, 'like')
        )
        await create_query_execute(
            database,
            'PostAltitude',
            insert_postaltitude(3, 1, 'like')
        )

        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
}

insert_data()
    .then(() => {
        console.log('[INFO] Insertion succeed')
    })
    .catch((error) => {
        console.log('[Error] Failed to insert all data')
        console.log(error)
    })
