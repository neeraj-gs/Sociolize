import { prismaclient } from "../../clients/db";
import { GraphqlContext } from "../../interfaces";

interface CreaateTweetPayload{
    content:string
    imageURL?:string
}


const mutations = {
    createTweet:async(parent:any,{payload}:{payload:CreaateTweetPayload}, ctx:GraphqlContext)=>{
        if(!ctx.user) throw new Error("You are Not Authenticated")
        console.log(ctx.user)
        const tweet = await prismaclient.tweet.create({
        data:{
            content: payload.content,
            imageURL: payload.imageURL,
            author:{
                connect:{id:ctx.user.id}
            }
        }
        })

    return tweet;
    }
}

export const resolvers = {mutations}