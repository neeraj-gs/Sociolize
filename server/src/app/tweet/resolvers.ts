import { Tweet } from "@prisma/client";
import { prismaclient } from "../../clients/db";
import { GraphqlContext } from "../../interfaces";

interface CreaateTweetPayload{
    content:string
    imageURL?:string
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



export const resolvers = {mutations,authorResolver}