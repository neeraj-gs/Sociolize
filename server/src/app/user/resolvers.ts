import axios from "axios";
import { prismaclient } from "../../clients/db";
import JWTService from "../services/jwt";
import { GraphqlContext } from "../../interfaces";
import { User } from "@prisma/client";

interface GoogleTokenResult{
    iss?:string;
    nbf?:string;
    aud?:string;
    sub?:string;
    email:string;
    email_verified:string;
    azp?:string;
    name?:string;
    picture?:string;
    given_name:string;
    family_name?:string;
    iat?:string;
    exp?:string;
    jti?:string;
    alg?:string;
    kid?:string;
    typ?:string;
}

// give a google token , we take the suer from ogogle apia dn get the resuly , then cahcke if user si  in db , if not user create a new User, and then create a token and return teh token 

const queries = {
    verifyGoogleToken: async(parent:any,{token}:{token:string})=>{
        const googleToken = token;
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo')  //base url , we are creting a new url 
        googleOauthURL.searchParams.set('id_token',googleToken)

        const {data} = await axios.get<GoogleTokenResult>(googleOauthURL.toString(),{
            responseType: 'json',
        })

        const user = await prismaclient.user.findUnique({
            where:{
                email:data.email,
            }})

        if(!user){
            await prismaclient.user.create({
                data:{
                    email:data.email,
                    firstName:data.given_name,
                    lastName:data.family_name,
                    profileImageURL:data.picture

                }
            })
        }
        const userInDb = await prismaclient.user.findUnique({
            where:{
                email:data.email,
            }
        })
        if(!userInDb){
            throw new Error("No User Foudn with this Email")
        }
        const userToken = JWTService.generateToeknForUser(userInDb)
        return userToken;

        
    },

    getCurrentUser: async(parent:any,args:any,ctx:GraphqlContext)=>{
        // console.log(ctx)
        if(!ctx.user) return null;

        const user =await prismaclient.user.findUnique({
            where:{
                id:ctx.user.id
            }
        })
        return user;


    }
    //context is basically used to get the header from the authoriationa dn tehn use it for better integrations

};

const getTweets = {
    User: {
        tweets:(parent:User)=> prismaclient.tweet.findMany({
            where:{
                author:{id:parent.id}
            }
        })
    }
}

export const resolvers = {queries,getTweets}