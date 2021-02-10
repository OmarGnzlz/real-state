const axios = require('axios');

function remoteDB  (host, port)  {
    const instance = axios.create({
        baseURL: `http://${host}:${port}/mysql/`,
        timeout: 5000,
        heardes: { 'Content-Type': 'aplication/json'},
    })

    const list = (table) => {
        return request('GET', table)
    }
    
    const get = (table, id) => {
        return request('GET', `${table}/${id}`)
    }
    
    const find = (table, email) => {
        return request('GET', `find/${table}/${email}`)
    }

    const remove = (table, id) => {
        return request('DELETE', `${table}/${id}`)
    }

    const create = (table, data) => {
        return request('POST', table, data)
    }

    const update = (table, id, data) => {
        return request('PUT', `${table}/${id}`, data)
    }


    const request = async (method, url , data) => {
        try {
            const response = await instance({
                method,
                url,
                data
            })
            return response.data
        } catch (error) {
            throw new Error(error)
        }
    }


    return{
        list,
        get,
        find,
        remove,
        create,
        update
    }
}


module.exports = remoteDB