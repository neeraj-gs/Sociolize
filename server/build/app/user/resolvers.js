"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../../clients/db");
const jwt_1 = __importDefault(require("../services/jwt"));
// give a google token , we take the suer from ogogle apia dn get the resuly , then cahcke if user si  in db , if not user create a new User, and then create a token and return teh token 
const queries = {
    verifyGoogleToken: (parent, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const googleToken = token;
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo'); //base url , we are creting a new url 
        googleOauthURL.searchParams.set('id_token', googleToken);
        const { data } = yield axios_1.default.get(googleOauthURL.toString(), {
            responseType: 'json',
        });
        const user = yield db_1.prismaclient.user.findUnique({
            where: {
                email: data.email,
            }
        });
        if (!user) {
            yield db_1.prismaclient.user.create({
                data: {
                    email: data.email,
                    firstName: data.given_name,
                    lastName: data.family_name,
                    profileImageURL: data.picture
                }
            });
        }
        const userInDb = yield db_1.prismaclient.user.findUnique({
            where: {
                email: data.email,
            }
        });
        if (!userInDb) {
            throw new Error("No User Foudn with this Email");
        }
        const userToken = jwt_1.default.generateToeknForUser(userInDb);
        return userToken;
    }),
    getCurrentUser: (parent, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(ctx)
        if (!ctx.user)
            return null;
        const user = yield db_1.prismaclient.user.findUnique({
            where: {
                id: ctx.user.id
            }
        });
        return user;
    })
    //context is basically used to get the header from the authoriationa dn tehn use it for better integrations
};
const getTweets = {
    User: {
        tweets: (parent) => db_1.prismaclient.tweet.findMany({
            where: {
                author: { id: parent.id }
            }
        })
    }
};
exports.resolvers = { queries, getTweets };
