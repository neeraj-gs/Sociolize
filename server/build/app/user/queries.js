"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
    verifyGoogleToken(token: String!): String
    getCurrentUser: User
`;
//we are not accepting any parametrs for getCurent Userwe need to read headers so we need t use COntext from server
