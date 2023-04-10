const Pool = require('pg').Pool

const connect_db = async () => {
    try {
        const pool = new Pool({
            user: 'jeffery',
            host: 'localhost',
            database: 'cuhub',
            password: 'cuhub',
            idleTimeoutMillis: 30000,
            port: 5432,
        })
        await pool.connect()
        console.log('[INFO] Connection established')
        return pool
    } catch (error) {
        console.log('[Error] Failed to connect to database')
        throw error
    }
}

module.exports = {
    connect_db,
}
