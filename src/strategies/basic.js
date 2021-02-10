const passport = require('passport')
const {BasicStrategy} = require('passport-http')
//const store = require('../store/mysql')
const store = require('../store/remote-sql')
const bcrypt = require('bcrypt')
const boom = require('@hapi/boom')


passport.use(
    new BasicStrategy(async (email, password, cb) => {
        try {
            const existingUser = await store.find('user', email)


            if (existingUser.length === 0) {
                return cb(boom.unauthorized(), false)
            }

            const auth = await store.get('authentication', existingUser.body[0].auth_id)


            if(!(await bcrypt.compare(password, auth.body[0].password))) {
                return cb(boom.unauthorized(), false)
            }

            
            
            return cb(null, existingUser.body[0])

        } catch (error) {
            return cb(error)
        }
    })
)
