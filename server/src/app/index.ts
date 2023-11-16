import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';

export async function initServer(){
    const app = express();
    app.use(bodyParser.json())
    
    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query{
            sayHello: String
        }
        `,
        resolvers:{
            Query:{
                sayHello: ()=>`test`,
            },
        },
    })

    await gqlServer.start();

    app.use('/graphql',expressMiddleware(gqlServer))

    return app;
}

