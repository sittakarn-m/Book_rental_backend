const bcrypt = require("bcryptjs");
const prisma = require("../configs/prismaClient");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function main() {
  try {
    await prisma.$transaction([
      prisma.bookOnOrder.deleteMany(),
      prisma.bookOnRental.deleteMany(), // Corrected table name
      prisma.order.deleteMany(),
      prisma.cart.deleteMany(),
      prisma.rental.deleteMany(),
      prisma.book.deleteMany(),
      prisma.category.deleteMany(),
      prisma.user.deleteMany(),
      prisma.image.deleteMany(),
    ]);

    // Seed Data: Categories (Book Genres)
    const categoryData = [
      { name: "classic" },
      { name: "comic" },
      { name: "general" },
      { name: "history" },
      { name: "cook" },
      { name: "magazine" },
    ];

    await prisma.$transaction(
      categoryData.map((category) => prisma.category.create({ data: category }))
    );

    // Hash password securely
    const hashedPassword = await hashPassword("123456");

    // Seed Data: Admin & User
    await prisma.user.upsert({
      where: { email: "admin@mail.com" },
      update: {},
      create: {
        firstName: "Admin",
        lastName: "Admin",
        email: "admin@mail.com",
        userName: "admin",
        password: hashedPassword,
        phone: "0123456789",
        address: "123 abc",
        street: "abc 123",
        zipCode: "1234",
        role: "ADMIN",
      },
    });

    await prisma.user.upsert({
      where: { email: "user@mail.com" },
      update: {},
      create: {
        firstName: "User",
        lastName: "User",
        email: "user@mail.com",
        userName: "user",
        password: hashedPassword,
        phone: "0123456789",
        address: "123 abc",
        street: "abc 123",
        zipCode: "1234",
        role: "USER",
      },
    });

    console.log("Seed data inserted successfully!");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();