import axios from "axios";

const queries = {
    verifyGoogleToken: async(parent:any,{token}:{token:string})=>{
        const googleToken = token;
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo')  //base url , we are creting a new url 
        googleOauthURL.searchParams.set('id_token',googleToken)

        const {data} = await axios.get(googleOauthURL.toString(),{
            responseType: 'json',
        })

        console.log(data)
        return "OK"
    }
};

export const resolvers = {queries}