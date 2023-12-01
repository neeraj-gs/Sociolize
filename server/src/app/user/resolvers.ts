import axios from "axios";
import { prismaclient } from "../../client/db";

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

        
    }
};

export const resolvers = {queries}