import { Tweet } from "@prisma/client";
import { prismaclient } from "../../clients/db";
import { GraphqlContext } from "../../interfaces";
import { S3Client,PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


interface CreaateTweetPayload{
    content:string
    imageURL?:string
}

const s3Client = new S3Client({
    credentials:{accessKeyId:'',secretAccessKey:''}
})

const queries = {
    getAllTweets:()=>prismaclient.tweet.findMany({
            orderBy:{createdAt:"desc"}
        }),
        getSignedURLForTweet: async(parent:any,{imageType}:{imageType:string},ctx:GraphqlContext)=>{
            if(!ctx.user || ctx.user.id) throw new Error("You Are Unauthenticated")

            const allowedImageTypes = ['jpg','jpeg','png','webp'];
            if(!allowedImageTypes.includes(imageType)) throw new Error("Unsupported Image Type ,need to upload onyl jpg,jpeg,png and webp")
        }    
}


const mutations = {
    createTweet:async(parent:any,{payload}:{payload:CreaateTweetPayload}, ctx:GraphqlContext)=>{
        const id = ctx.user?.id;
        if(!id) throw new Error("You are Not Authenticated")
        // console.log(ctx.user)
        const tweet = await prismaclient.tweet.create({
        data:{
            content: payload.content,
            imageURL: payload.imageURL,
            author:{
                connect:{id:id}
            }
        }
        })

    return tweet;
    }
}

const authorResolver = {
    Tweet:{ //for a tweet you are asking for an author
        author: (parent:Tweet)=> prismaclient.user.findUnique({
            where:{
                id: parent.authorId //finding user from tweets author id
            }
        })
    }
}



export const resolvers = {mutations,authorResolver,queries}