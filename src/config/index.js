require(`dotenv`).config()

const config = {
    api:{
        port: process.env.PORT || 3000
    },
    post_api:{
        port: process.env.PORT_POST || 3002
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secretkey'
    },
    mysql:{
        host: process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || 'admin',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || 'real_state',
    },
    mysql_api:{
        host: process.env.MYSQL_API_HOST || 'localhost',
        port: process.env.MYSQL_API_PORT || 3001
    },
    aws_key:{
        keyId: process.env.ACCESS_KEY,
        secretKey: process.env.SECRET_KEY
    }
}

module.exports = config