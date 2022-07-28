require('dotenv').config()

const config = {
    dev: process.env.NODE_ENV !== 'production',
    api: process.env.API_URL,
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
}

module.exports = config