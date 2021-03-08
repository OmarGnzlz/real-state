const { nanoid } = require('nanoid')
const auth = require('../auth')
const bcrypt = require('bcrypt')


const TABLE = 'user'
module.exports = (inejectedStore) => {

    let store = inejectedStore

    if(!store) {
        store = require('../../../store/pgdb')
    }

    const listUsers = async() => {
        return await store.list(TABLE)
    }

    const getUser = async(id) => {
        try {
            if(!id){
                throw new Error("Missing data")
            }
            
            const user =  await store.get(TABLE, id)
        

            if(user.body.length === 0 ){ 
                throw new Error("No such as User")
            }

            return user

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
            const authId = nanoid() 

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
            const user = await store.get(TABLE, id)
            
            console.log(user.body[0])

            let userID = user.body[0].id
            let authID = user.body[0].auth_id

            const ids = [authID, userID ]
            const tables = ['authentication', 'user']

            let result
            for (let i = 0; ids.length > i; i++ ){
                result = await store.remove(tables[i], ids[i])

            }

            return  {'System Message':'User succesfully delete'}

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

            const hashPassworrd = await bcrypt.hash(body.password, 8)
            
            if(body.password) {
                await auth.passwordUpdate({
                    id: user.body[0].auth_id,
                    user_id: user.body[0].id,
                    password: hashPassworrd
                })
            }

            const updatedUser = {
                name: body.name,
                userName: body.userName,
                email: body.email,
                phone: body.phone,
                auth_id: user.body[0].auth_id
            }

            return await store.update(TABLE, id, updatedUser)
        } catch (error) {
            throw new Error(error)
        }
    }

    return {
        listUsers,
        getUser,
        createUser,
        deleteUser,
        userUpdate
    }
}