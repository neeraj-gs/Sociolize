"use strict";
//setting up a cleitn taht will allow us to comunicate with teh databse in our project
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaclient = void 0;
const client_1 = require("@prisma/client");
exports.prismaclient = new client_1.PrismaClient({});
