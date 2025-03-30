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
      { id: 1, name: "classic" },
      { id: 2, name: "comic" },
      { id: 3, name: "general" },
      { id: 4, name: "history" },
      { id: 5, name: "cook" },
      { id: 6, name: "magazine" },
    ];

    const booksData = [
      // 🟦 classic
      {
        title: "Pride and Prejudice",
        author: "Author Classic 1",
        publisher: "Classic Publisher",
        detail: "This is a sample description for Pride and Prejudice.",
        pricePerDay: 4.27,
        stock: 5,
        status: "AVAILABLE",
        category: "classic",
      },
      {
        title: "Moby Dick",
        author: "Author Classic 2",
        publisher: "Classic Publisher",
        detail: "This is a sample description for Moby Dick.",
        pricePerDay: 2.29,
        stock: 5,
        status: "AVAILABLE",
        category: "classic",
      },
      {
        title: "Great Expectations",
        author: "Author Classic 3",
        publisher: "Classic Publisher",
        detail: "This is a sample description for Great Expectations.",
        pricePerDay: 4.69,
        stock: 7,
        status: "AVAILABLE",
        category: "classic",
      },
      {
        title: "1984",
        author: "Author Classic 4",
        publisher: "Classic Publisher",
        detail: "This is a sample description for 1984.",
        pricePerDay: 2.59,
        stock: 9,
        status: "AVAILABLE",
        category: "classic",
      },
      {
        title: "To Kill a Mockingbird",
        author: "Author Classic 5",
        publisher: "Classic Publisher",
        detail: "This is a sample description for To Kill a Mockingbird.",
        pricePerDay: 3.79,
        stock: 5,
        status: "AVAILABLE",
        category: "classic",
      },

      //  comic
      {
        title: "Spider-Man",
        author: "Author Comic 1",
        publisher: "Comic Publisher",
        detail: "This is a sample description for Spider-Man.",
        pricePerDay: 2.19,
        stock: 8,
        status: "AVAILABLE",
        category: "comic",
      },
      {
        title: "Batman",
        author: "Author Comic 2",
        publisher: "Comic Publisher",
        detail: "This is a sample description for Batman.",
        pricePerDay: 3.45,
        stock: 4,
        status: "AVAILABLE",
        category: "comic",
      },
      {
        title: "One Piece",
        author: "Author Comic 3",
        publisher: "Comic Publisher",
        detail: "This is a sample description for One Piece.",
        pricePerDay: 4.11,
        stock: 6,
        status: "AVAILABLE",
        category: "comic",
      },
      {
        title: "Naruto",
        author: "Author Comic 4",
        publisher: "Comic Publisher",
        detail: "This is a sample description for Naruto.",
        pricePerDay: 3.66,
        stock: 10,
        status: "AVAILABLE",
        category: "comic",
      },
      {
        title: "Attack on Titan",
        author: "Author Comic 5",
        publisher: "Comic Publisher",
        detail: "This is a sample description for Attack on Titan.",
        pricePerDay: 2.98,
        stock: 3,
        status: "AVAILABLE",
        category: "comic",
      },

      //  general
      {
        title: "The Alchemist",
        author: "Author General 1",
        publisher: "General Publisher",
        detail: "This is a sample description for The Alchemist.",
        pricePerDay: 3.25,
        stock: 5,
        status: "AVAILABLE",
        category: "general",
      },
      {
        title: "The Midnight Library",
        author: "Author General 2",
        publisher: "General Publisher",
        detail: "This is a sample description for The Midnight Library.",
        pricePerDay: 4.55,
        stock: 7,
        status: "AVAILABLE",
        category: "general",
      },
      {
        title: "Atomic Habits",
        author: "Author General 3",
        publisher: "General Publisher",
        detail: "This is a sample description for Atomic Habits.",
        pricePerDay: 3.99,
        stock: 4,
        status: "AVAILABLE",
        category: "general",
      },
      {
        title: "The Power of Now",
        author: "Author General 4",
        publisher: "General Publisher",
        detail: "This is a sample description for The Power of Now.",
        pricePerDay: 2.65,
        stock: 6,
        status: "AVAILABLE",
        category: "general",
      },
      {
        title: "Outliers",
        author: "Author General 5",
        publisher: "General Publisher",
        detail: "This is a sample description for Outliers.",
        pricePerDay: 4.12,
        stock: 8,
        status: "AVAILABLE",
        category: "general",
      },

      //  history
      {
        title: "Sapiens",
        author: "Author History 1",
        publisher: "History Publisher",
        detail: "This is a sample description for Sapiens.",
        pricePerDay: 3.87,
        stock: 9,
        status: "AVAILABLE",
        category: "history",
      },
      {
        title: "The Silk Roads",
        author: "Author History 2",
        publisher: "History Publisher",
        detail: "This is a sample description for The Silk Roads.",
        pricePerDay: 2.75,
        stock: 5,
        status: "AVAILABLE",
        category: "history",
      },
      {
        title: "A People's History",
        author: "Author History 3",
        publisher: "History Publisher",
        detail: "This is a sample description for A People's History.",
        pricePerDay: 3.99,
        stock: 4,
        status: "AVAILABLE",
        category: "history",
      },
      {
        title: "The Wright Brothers",
        author: "Author History 4",
        publisher: "History Publisher",
        detail: "This is a sample description for The Wright Brothers.",
        pricePerDay: 4.15,
        stock: 6,
        status: "AVAILABLE",
        category: "history",
      },
      {
        title: "The Guns of August",
        author: "Author History 5",
        publisher: "History Publisher",
        detail: "This is a sample description for The Guns of August.",
        pricePerDay: 2.81,
        stock: 7,
        status: "AVAILABLE",
        category: "history",
      },

      //  cook
      {
        title: "Salt Fat Acid Heat",
        author: "Author Cook 1",
        publisher: "Cook Publisher",
        detail: "This is a sample description for Salt Fat Acid Heat.",
        pricePerDay: 4.05,
        stock: 3,
        status: "AVAILABLE",
        category: "cook",
      },
      {
        title: "Mastering the Art of French Cooking",
        author: "Author Cook 2",
        publisher: "Cook Publisher",
        detail:
          "This is a sample description for Mastering the Art of French Cooking.",
        pricePerDay: 3.89,
        stock: 5,
        status: "AVAILABLE",
        category: "cook",
      },
      {
        title: "The Food Lab",
        author: "Author Cook 3",
        publisher: "Cook Publisher",
        detail: "This is a sample description for The Food Lab.",
        pricePerDay: 4.78,
        stock: 4,
        status: "AVAILABLE",
        category: "cook",
      },
      {
        title: "Plenty",
        author: "Author Cook 4",
        publisher: "Cook Publisher",
        detail: "This is a sample description for Plenty.",
        pricePerDay: 2.55,
        stock: 6,
        status: "AVAILABLE",
        category: "cook",
      },
      {
        title: "Flour Water Salt Yeast",
        author: "Author Cook 5",
        publisher: "Cook Publisher",
        detail: "This is a sample description for Flour Water Salt Yeast.",
        pricePerDay: 3.65,
        stock: 5,
        status: "AVAILABLE",
        category: "cook",
      },

      //  magazine
      {
        title: "TIME",
        author: "Author Magazine 1",
        publisher: "Magazine Publisher",
        detail: "This is a sample description for TIME.",
        pricePerDay: 1.95,
        stock: 7,
        status: "AVAILABLE",
        category: "magazine",
      },
      {
        title: "National Geographic",
        author: "Author Magazine 2",
        publisher: "Magazine Publisher",
        detail: "This is a sample description for National Geographic.",
        pricePerDay: 2.45,
        stock: 6,
        status: "AVAILABLE",
        category: "magazine",
      },
      {
        title: "Forbes",
        author: "Author Magazine 3",
        publisher: "Magazine Publisher",
        detail: "This is a sample description for Forbes.",
        pricePerDay: 3.12,
        stock: 4,
        status: "AVAILABLE",
        category: "magazine",
      },
      {
        title: "Vogue",
        author: "Author Magazine 4",
        publisher: "Magazine Publisher",
        detail: "This is a sample description for Vogue.",
        pricePerDay: 2.89,
        stock: 5,
        status: "AVAILABLE",
        category: "magazine",
      },
      {
        title: "Scientific American",
        author: "Author Magazine 5",
        publisher: "Magazine Publisher",
        detail: "This is a sample description for Scientific American.",
        pricePerDay: 3.33,
        stock: 6,
        status: "AVAILABLE",
        category: "magazine",
      },
    ];

    await prisma.$transaction(
      categoryData.map((category) =>
        prisma.category.create({
          data: {
            id: category.id,
            name: category.name,
          },
        })
      )
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

    for (const book of booksData) {
      const category = await prisma.category.findUnique({
        where: { name: book.category },
      });

      if (!category) {
        console.warn(`Category not found for book: ${book.title}`);
        continue;
      }

      await prisma.book.create({
        data: {
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          detail: book.detail,
          pricePerDay: book.pricePerDay,
          stock: book.stock,
          status: book.status,
          category: {
            connect: { id: category.id },
          },
        },
      });
    }

    console.log("Seed data inserted successfully!");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
