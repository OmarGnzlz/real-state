const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    database: 'real_state',
    password: 'resina1996',
    host: 'localhost',
    port: 5432
})

const get = async(TABLE, id) => {
    try {
        const user = await pool.query(`SELECT * FROM public.${TABLE} WHERE user_id = $1`, [id])
        return user.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const list = async(TABLE) => {
    try {
        const user = await pool.query(` SELECT * FROM public.${TABLE}`)
        return user.rows   
    } catch (error) {
        throw new Error(error)
    }
}

const create = async(TABLE, id, name, userName, email, phone) => {
    try {
        const newUser = await pool.query(`INSERT INTO public.${TABLE} VALUES($1, $2, $3, $4, $5) RETURNING *`, [id, name, userName, email, phone])

        return newUser.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const remove = async(TABLE, id) =>{
    try {
        const user = await pool.query(`DELETE FROM public.${TABLE} WHERE user_id = $1`, [id])

    } catch (error) {
        throw new Error(error)
    }
}

const update = async(TABLE,id , field ,data) => {
    try {
        const user = await pool.query(`UPDATE public.${TABLE} SET ${field} = $1 WHERE user_id = $2 RETURNING *`,
        [data, id ])
        return user.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    list,
    get,
    create,
    remove,
    update

}

