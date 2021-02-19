require(`dotenv`).config()

const config = {
    api:{
        port: process.env.PORT || 3000
    },
    post_api:{
        port: process.env.PORT_POST || 3002
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'password',
        database: process.env.MYSQL_DATABASE || 'real_state'
    },
    mysql_api:{
        host: process.env.MYSQL_API_HOST || 'localhost',
        port: process.env.MYSQL_API_PORT || 3001
    }
}

module.exports = config