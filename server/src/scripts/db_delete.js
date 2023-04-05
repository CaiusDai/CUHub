const { connect_db } = require('../configs/db')

// Queries:
const query =
    '\
            DROP INDEX IF EXISTS FollowFrom;\
            DROP INDEX IF EXISTS FollowBy;\
            DROP INDEX IF EXISTS PostCreator;\
            DROP INDEX IF EXISTS CommentPost;\
            DROP INDEX IF EXISTS RepostBy;\
            DROP INDEX IF EXISTS AltitudeOf;\
            DROP TABLE IF EXISTS PostAltitude;\
            DROP TYPE IF EXISTS STATUSTYPE;\
            DROP TABLE IF EXISTS Repost;\
            DROP TABLE IF EXISTS Comment;\
            DROP TABLE IF EXISTS Post;\
            DROP TABLE IF EXISTS Message;\
            DROP TABLE IF EXISTS ChatSession;\
            DROP TABLE IF EXISTS Block;\
            DROP TABLE IF EXISTS Announcement;\
            DROP TABLE IF EXISTS Admin;\
            DROP TABLE IF EXISTS Profile;\
            DROP TABLE IF EXISTS FollowRelationship;\
            DROP TABLE IF EXISTS Account;\
            DROP TYPE IF EXISTS GENDER;\
            DROP TYPE IF EXISTS TAG;'

async function delete_table() {
    try {
        // Get connection
        const database = await connect_db()

        return database
            .query(query)
            .then((result) => {
                console.log('[INFO] All Tables dropped successfully')
                return result
            })
            .catch((error) => {
                console.log('[Error] Error occurred during table deletion')
                return error
            })
    } catch (error) {
        console.log(error)
    }
}

delete_table()
    .then(() => {
        console.log('[INFO] Deletion end.')
    })
    .catch(() => {
        console.log('[Error] Deletion failed')
    })
