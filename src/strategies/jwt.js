const passport = require('passport')
const { Strategy } =require('passport-jwt')
const store = require('../store/mysql');


const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies.token;
    }
    return token;
}

passport.use(
    new Strategy(
        {
            secretOrKey: 'secret',
            jwtFromRequest: cookieExtractor
        },

        async (payload, cb) => {
            try {
                
                const email = payload.email

                const user = await store.find('user', email )

                
                if(!user){
                    return cb(error, false)
                }


                return cb(false, user) 
            } catch (error) {
                return cb(error)
            }
        }
    )
)