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
exports.initServer = void 0;
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./user");
const tweet_1 = require("./tweet");
const jwt_1 = __importDefault(require("./services/jwt"));
function initServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(body_parser_1.default.json());
        app.use((0, cors_1.default)());
        const gqlServer = new server_1.ApolloServer({
            typeDefs: `
        ${user_1.User.types}
        ${tweet_1.Tweet.types}

        type Query{
            ${user_1.User.queries}
        }

        type Mutation{
            ${tweet_1.Tweet.mutations}
        }
        `,
            resolvers: {
                Query: Object.assign({}, user_1.User.resolvers.queries),
                Mutation: Object.assign({}, tweet_1.Tweet.resolvers.mutations)
            },
        });
        yield gqlServer.start();
        app.use('/graphql', (0, express4_1.expressMiddleware)(gqlServer, {
            context: ({ req, res }) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split('Bearer ')[1];
                if (token) {
                    const user = jwt_1.default.decodeToken(token);
                    return { user };
                }
                return {};
            })
        }));
        return app;
    });
}
exports.initServer = initServer;
