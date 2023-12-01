import { User } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { JWTUser } from "../../interfaces";
const secret = 'gijgbaekjbg'



class JWTService{
    public static  generateToeknForUser(user:User){
        // const user =await prismaclient.user.findUnique({
        //     where:{
        //         id:userId
        //     }
        // })
        const payload: JWTUser = {
            id:user?.id,
            email:user?.email
        }
        const token = jwt.sign(payload,secret);
        return token;
    }

    public static decodeToken(token:string){
        return jwt.verify(token,secret) as JWTUser;
    }
}

export default JWTService