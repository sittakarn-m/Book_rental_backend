// connect database
const { PrismaClient } = require("@prisma/client")
// Create instant for CRUD
const prisma = new PrismaClient()


module.exports = prisma;