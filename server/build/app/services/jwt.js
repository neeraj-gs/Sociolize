"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'gijgbaekjbg';
class JWTService {
    static generateToeknForUser(user) {
        // const user =await prismaclient.user.findUnique({
        //     where:{
        //         id:userId
        //     }
        // })
        const payload = {
            id: user === null || user === void 0 ? void 0 : user.id,
            email: user === null || user === void 0 ? void 0 : user.email
        };
        const token = jsonwebtoken_1.default.sign(payload, secret);
        return token;
    }
    static decodeToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, secret);
        }
        catch (error) {
            return null;
        }
    }
}
exports.default = JWTService;
