const { nanoid } =require('nanoid')


module.exports = (injectedStore) => {
    let store = injectedStore

    if(!store) {
        store = require('../../../store/dummy')
    }

    const listPost = async() => {
        const posts = await store.listPost('post')
        
        return posts   
    }

    const getPost = async(id) => {
        const post = await store.getPost('post', id)

        return post
    }

    const createPost = async(id, body) => {
        try {
            const postId = nanoid()
            const locationId = nanoid()
            const staticsId = nanoid()

           let location = { }
           let statics = { }

            if(body.state){
                let dataLocation = {
                    id: locationId,
                    state: body.state,
                    city: body.city,
                    address: body.address,
                    longitude: body.longitude,
                    latitude: body.latitude
                }

                location = await store.create('location', dataLocation)
                
            }

            if(body.image){
                let dataStatics = {
                    id: staticsId,
                    image: body.image,
                    video: body.video,
                    url: body.url,
                    other_resources: body.other
                }

                statics = await store.create('statics', dataStatics)  
            }

            const dataPost = {
                id: postId,
                user_id: id,
                offer_type: body.offer,
                realState_type: body.home_type,
                title: body.title,
                description: body.description,
                location_id: locationId,
                statics_id: staticsId
            }


            let post = await store.create('post', dataPost)
            
            return { post, location , statics}

        } catch (error) {
            throw new Error(error)
        }
    }

    return {
        createPost,
        listPost,
        getPost
    }

}