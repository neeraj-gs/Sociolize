import { User } from "@prisma/client";
import { prismaclient } from "../../clients/db";
import jwt from 'jsonwebtoken'

const secret = 'gijgbaekjbg'

class JWTService{
    public static  generateToeknForUser(user:User){
        // const user =await prismaclient.user.findUnique({
        //     where:{
        //         id:userId
        //     }
        // })
        const payload = {
            id:user?.id,
            email:user?.email
        }
        const token = jwt.sign(payload,secret);
        return token
    }
}

export default JWTService