require('dotenv').config()
const prisma = require('../configs/prismaClient')

async function run() {
	try{
		await prisma.$executeRawUnsafe('DROP DATABASE RrR_book01')
		await prisma.$executeRawUnsafe('CREATE DATABASE RrR_book01')
	}catch(err){
		console.log(err)
	}
}

console.log('Reset DB...')
run()
