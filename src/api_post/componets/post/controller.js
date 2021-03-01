const { nanoid } =require('nanoid')
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')


const s3 = new AWS.S3({
    credentials: {
        accessKeyId: 'AKIAISZIZVIBJHNDLHKA',
        secretAccessKey: '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',
        region: 'us-east-2'
    }
}) 

const uploadS3 =  async (params) => {
    const response =  await s3.upload(params,  (error, data) => {
        if(error){
            throw new Error(error)
        }
        return data.Location
    }).promise()

    return response
}

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

    const getAPost = async(id) => {
        const post = await store.getPost(id)

        return post
    }

    const filterLocation = async(location) => {
        const posts = await store.searchLocation(location)
        
        return posts
    }
    
    const filterPrice = async(range1, range2) => {
        const posts = await store.searchPrice(range1, range2)
        
        return posts
    }

  
    
    const createPost = async(id, body, images, video) => {
        try {
            const postId = nanoid()
            const locationId = nanoid()
            const staticsId = nanoid()
            

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
            
            
            if(images ){
                
                let imageFileArr = []
                let imageTypeArr = []
                let imageNameArr = []
                let imageURLArr = []
                let videoUrl = ''   
                

                for(let i = 0; images.length > i; i++){
                    
                    let imageFile =images[i].originalname.split('.')
                    imageFileArr.push(imageFile)
                    
                    let imageName = imageFileArr[i][0]
                    imageNameArr.push(imageName)

                    let imageType = imageFileArr[i][imageFile.length - 1]
                    imageTypeArr.push(imageType)

                    let keyS3 = `${uuidv4()}.${imageNameArr[i]}.${imageTypeArr[i]}`
                    
                    const params = {
                        Bucket: 'real-state-app2021',
                        Key: keyS3,
                        Body: images[i].buffer
                    }
                

                    let dataToS3 = await uploadS3(params)

                    imageURLArr.push(dataToS3.Location)
                    
                }  

                console.log(imageURLArr)

                /* if(video){

                    videoFile = video.originalname.split('.')
                    videoType = videoFile[videoFile.length - 1]

                    const params = {
                        Bucket: 'real-state-app2021',
                        Key: `${uuidv4()}.${videoType}`,
                        Body: video.buffer
                    }

                    s3.upload(params, async (error, data) => {
                        if(error){
                            console.log(error)
                            throw new Error(error)
                        }
                        
                        return videoUrl = await data

                    })
                        
                } */
                

                let dataStatics = {
                    id: staticsId,
                    image: imageURLArr[0],
                    image1: imageURLArr[1],
                    image2: imageURLArr[2],
                    image3: imageURLArr[3],
                    image4: imageURLArr[4],
                    image5: imageURLArr[5],
                    image6: imageURLArr[6],
                    image7: imageURLArr[7],
                    video: videoUrl.Location,
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

                let imageFileArr = []
                let imageTypeArr = []
                let imageNameArr = []
                let imageURLArr = []
                let videoUrl = ''
  
                for(let i = 0; images.length > i; i++){
                    
                    let imageFile =images[i].originalname.split('.')
                    imageFileArr.push(imageFile)
                    
                    let imageName = imageFileArr[i][0]
                    imageNameArr.push(imageName)

                    let imageType = imageFileArr[i][imageFile.length - 1]
                    imageTypeArr.push(imageType)

                    let keyS3 = `${uuidv4()}.${imageNameArr[i]}.${imageTypeArr[i]}`
                    
                    const params = {
                        Bucket: 'real-state-app2021',
                        Key: keyS3,
                        Body: images[i].buffer
                    }
                

                    let dataToS3 = await uploadS3(params)

                    imageURLArr.push(dataToS3.Location)
                    
                } 
                

                /* if(video){
                    videoUrl = `http://localhost:3002/public/files/${video.filename}`
                } */

                let dataStatics = {
                    id: post.body[0].statics_id,
                    image: imageURLArr[0] ,
                    image1: imageURLArr[1] ,
                    image2: imageURLArr[2] ,
                    image3: imageURLArr[3],
                    image4: imageURLArr[4],
                    image5: imageURLArr[5],
                    image6: imageURLArr[6],
                    image7: imageURLArr[7],
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
                price: body.price,
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
        deletePost,
        filterLocation,
        filterPrice
    }

}