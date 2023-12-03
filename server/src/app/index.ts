import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors'

import { User } from './user';
import { Tweet } from './tweet';
import { GraphqlContext } from '../interfaces';
import JWTService from './services/jwt';

export async function initServer(){
    const app = express();
    app.use(bodyParser.json())
    app.use(cors())
    
    const gqlServer = new ApolloServer<GraphqlContext>({
        typeDefs: `
        ${User.types}
        ${Tweet.types}

        type Query{
            ${User.queries}
        }

        type Mutation{
            ${Tweet.mutations}
        }
        `,
        resolvers:{
            Query:{
                ...User.resolvers.queries
            },
            Mutation:{
                ...Tweet.resolvers.mutations
            },
            ...Tweet.resolvers.authorResolver
        },
    })

    await gqlServer.start();

    app.use('/graphql',
    expressMiddleware(gqlServer,{
        context: async({req,res})=>{
            const token = req.headers.authorization?.split('Bearer ')[1];
            if(token){
                const user = JWTService.decodeToken(token);
                return {user};
            }
            return {};
        }
    })
    )

    return app;
}

