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
        const post = await store.getPostUser('post', id)

        return post
    }

    const getAPost = async (id) => {
        const post = await store.getPost(id)


        return post
    }

    const createPost = async(id, body, images, video) => {
        try {
            const postId = nanoid()
            const locationId = nanoid()
            const staticsId = nanoid()
            
           console.log(images)
            
            if(body.state){
                let dataLocation = {
                    id: locationId,
                    state: body.state,
                    city: body.city,
                    address: body.address,
                    longitude: body.longitude,
                    latitude: body.latitude
                }
                
                await store.create('location', dataLocation)
                
            }
            
            let videoUrl = ""
            let imageUrl = ""

            if(images){
                
                let imagesArr = []
                
                if(images || video ){

                    for(let i = 0; images.length > i; i++){
                        
                        imageUrl = `http://localhost:3002/public/files/${images[i].filename}`
                        imagesArr.push(imageUrl)
                    }
                } 
                

                if(video){
                    videoUrl = `http://localhost:3002/public/files/${video.filename}`
                }
                
                let dataStatics = {
                    id: staticsId,
                    image: imagesArr[0] ,
                    image1: imagesArr[1] ,
                    image2: imagesArr[2] ,
                    image3: imagesArr[3],
                    image4: imagesArr[4],
                    image5: imagesArr[5],
                    image6: imagesArr[6],
                    image7: imagesArr[7],
                    video: videoUrl,
                    url: body.url,
                    other_resources: body.other
                }
                
                await store.create('statics', dataStatics) 
            }
            
            const dataPost = {
                id: postId,
                user_id: id,
                offer_type: body.offer,
                realState_type: body.home_type,
                title: body.title,
                description: body.description,
                price: body.price,
                location_id: locationId,
                statics_id: staticsId
            }
            
            
            return await store.create('post', dataPost)
            
        } catch (error) {
            throw new Error(error)
        }
    }

    const updatePost = async(id, body, images, video) => {
        try {
           
            
            const post = await store.getPost( id)
            
            
            if(body.state){
                let dataLocation = {
                    id: post.body[0].location_id,
                    state: body.state,
                    city: body.city,
                    address: body.address,
                    longitude: body.longitude,
                    latitude: body.latitude
                }
                
                await store.update('location', dataLocation.id, dataLocation)
                
            }
            
            if(images || video){

                let imagesArr = []
                
                if(images){

                    for(let i = 0; images.length > i; i++){
                        
                        imageUrl = `http://localhost:3002/public/files/${images[i].filename}`
                        imagesArr.push(imageUrl)
                    }
                } 
                

                if(video){
                    videoUrl = `http://localhost:3002/public/files/${video.filename}`
                }

                let dataStatics = {
                    id: post.body[0].statics_id,
                    image: imagesArr[0] ,
                    image1: imagesArr[1] ,
                    image2: imagesArr[2] ,
                    image3: imagesArr[3],
                    image4: imagesArr[4],
                    image5: imagesArr[5],
                    image6: imagesArr[6],
                    image7: imagesArr[7],
                    video: videoUrl,
                    url: body.url,
                    other_resources: body.other
                }
                
                await store.update('statics', dataStatics.id, dataStatics)
            }
            
            const dataPost = {
                id: post.body[0].id,
                user_id: post.body[0].user_id,
                offer_type: body.offer,
                realState_type: body.home_type,
                title: body.title,
                description: body.description,
                location_id: post.body[0].location_id,
                statics_id: post.body[0].statics_id
            }
            
            return await store.update('post', dataPost.id, dataPost)
            
            
        } catch (error) {
            throw new Error(error)
        }


    }
    
     const deletePost = async (id) => {
        
        const post = await store.getPost(id)

        const locationId = post.body[0].location_id
        const staticsId = post.body[0].statics_id
        const postId = post.body[0].id

        const ids = [locationId, staticsId, postId ]
        const tables = ['location', 'statics', 'post']

        let result 
        for(let i = 0; ids.length > i;i++ ) {
            result = await store.remove(tables[i], ids[i])
            
        }
        return {'System Message':'post succesfully delete'}
     }
    
    return {
        createPost,
        updatePost,
        listPost,
        getPost,
        getAPost,
        deletePost

    }

}