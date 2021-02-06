const mysql = require('mysql')

const dfconfig = {
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'real_state'
}

let connection

const handleCon = () => {
    connection = mysql.createConnection(dfconfig)

    const del = connection._protocol._delegateError;
    connection._protocol._delegateError = function(err, sequence){
    if (err.fatal) {
        console.trace('fatal error: ' + err.message)
    }
    return del.call(this, err, sequence)
    }

    connection.connect((error) => {
        if(error) {
            console.error('[db error]', error)
        }
        else {
            console.log('DB connected')
        }
    })

    connection.on('error', error => {
        console.error('[db err]', error)
        if (error.code === 'PROTOCOL_CONNECTION_LOST'){
            handleCon()
        }else {
            throw error
        }
    })
}

handleCon()

const list =  (table) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, data) => {
            if(error) { return reject(error)}
            resolve(data)
        })
    })
}

const get = (table, id ) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (error, data) => {
            if(error) { return reject(error)}
            resolve(data)
        })
    })
}

const find = (table, email ) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE email = '${email}'`, (error, data) => {
            if (error) { return reject(error) }
            resolve(data)
        })
    })
}


const remove = (table, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id= '${id}'`, (error, data) => {
            if(error) { return reject(error) }
            resolve(data)
        })
    }) 
}

const create =  async (table, data) => {
    try {
        const user = await connection.query(`INSERT INTO ${table} SET ?`, data)
        return user.values
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (table, id, data) => {
    
    try {
        const result = await connection.query(`UPDATE ${table} SET ? WHERE id= '${id}'`, data)
        return result.values

    } catch (error) {
        throw new Error(error)
    }
}



module.exports = {
    list,
    get,
    remove,
    create,
    update,
    find
}