//setting up a cleitn taht will allow us to comunicate with teh databse in our project

import { PrismaClient } from "@prisma/client";
export const prismaclient = new PrismaClient({
    log:["query"]
});
