import { PrismaClient } from '@prisma/client'

export class PrismaDatabase{
    getPrisma(): PrismaClient{
        return new PrismaClient();
    }
}