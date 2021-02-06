const { nanoid } =require('nanoid')

module.exports = (injectedStore) => {
    let store = injectedStore

    if(!store) {
        store = require('../../../store/dummy')
    }

    const createPost = async(body) => {
        //logit post
    }

}