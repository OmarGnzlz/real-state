const jwt = require('jsonwebtoken')
const config = require('../../../config/index')

const TABLE = 'authentication'
module.exports = (inejectedStore) => {

    let store = inejectedStore

    if(!store) {
        store = require('../../../store/pgdb')
    }

    const passwordInsert = async(data) => {
        const authData = {
            id: data.id
        }

        if(data.user_id){
            authData.user_id = data.user_id
        }

        if(data.password){
            authData.password = data.password
        }

        return await store.create(TABLE, authData)
    }

    const passwordUpdate = async (data) => {
        const authData = {
            user_id: data.user_id
        }

        if(data.password) {
            authData.password = data.password
        }

        

        return await store.update(TABLE, data.id, authData)
    }

    const createToken = async (user) => {

        const { id, name, email } = user

        const playload = {
            sub: id,
            name,
            email
        }

        const token = jwt.sign(playload, config.jwt.secret, {
            expiresIn: '30m'
        })

        return token

    }
    return {
        passwordInsert,
        passwordUpdate,
        createToken
    }
}