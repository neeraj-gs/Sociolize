export const queries = `#graphql
    verifyGoogleToken(token: String!): String
    getCurrentUser: User
`;

//we are not accepting any parametrs for getCurent Userwe need to read headers so we need t use COntext from server