const { nanoid } = require('nanoid')
const auth = require('../auth/')
const bcrypt = require('bcrypt')

const TABLE = 'user'
module.exports = (inejectedStore) => {

    let store = inejectedStore

    if(!store) {
        store = require('../../../store/dummy')
    }

    const lisUsers = async() => {
        return await store.list(TABLE)
    }

    const getUser = async(id) => {
        try {
            if(!id){
                throw new Error("Missing data")
            }
            return await store.get(TABLE, id)
        } catch (error) {
            throw new Error(error)
        }
    }

    const createUser = async(body) => {
        try {
            if(!body.name || !body.userName || !body.email || !body.phone ){
                throw new Error("Missing data")
            }

            const userId = nanoid()
            const authId = nanoid () 

            const user = {
                id : userId,
                name: body.name,
                userName: body.userName,
                email: body.email,
                phone: body.phone,
                auth_id: authId
                
            }

            const hashPassworrd = await bcrypt.hash(body.password, 8)

            if (body.password) {
                await auth.passwordInsert({
                    id : authId ,
                    user_id : user.id,
                    password: hashPassworrd

                })
            }


            return await store.create(TABLE, user )
        } catch (error) {
            throw new Error(error)

        }
    }

    const deleteUser = async(id) => {
        try {
            if(!id){
                throw new Error("Missing data")
            }
            await store.remove(TABLE, id)

            return result = {
                'System Message': "User succesfully delete"
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    const userUpdate = async(id, body) => {
        try {
            if(!id ){
                throw new Error('Missing data')
            }

            const user = await store.get(TABLE, id)

            if(user.length === 0) { 
                throw new Error("User does not exist")
            }
            
            if(body.password) {
                await auth.passwordUpdate({
                    id: user[0].auth_id,
                    user_id: user[0].id,
                    password: body.password
                })
            }

            const updatedUser = {
                name: body.name,
                userName: body.userName,
                email: body.email,
                phone: body.phone,
                auth_id: user[0].auth_id
            }

            return await store.update(TABLE, updatedUser, id)
        } catch (error) {
            throw new Error(error)
        }
    }

    return {
        lisUsers,
        getUser,
        createUser,
        deleteUser,
        userUpdate
    }
}