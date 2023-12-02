"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql

    type Tweet {
        id: ID!
        content: String!
        imageURL: String

        author: User
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        profileImageURL: String

        tweets: [Tweet]
    }

`;
