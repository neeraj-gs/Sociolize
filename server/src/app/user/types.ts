export const types = `#graphql

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

`