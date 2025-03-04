const prisma = require("../configs/prismaClient");

exports.create = async (req, res) => {
  try {
    const {
      title,
      author,
      publisher,
      detail,
      pricePerDay,
      coverImage,
      stock,
      categoryId,
    } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        publisher,
        detail,
        pricePerDay: parseFloat(pricePerDay),
        coverImage: coverImage ? { create: [{ url: coverImage }] } : undefined,
        stock: parseInt(stock),
        categoryId: parseInt(categoryId),
      },
    });
    res.json({ message: "Hello create book" });
  } catch (error) {
    next(error)
  }
};

exports.list = async (req, res) => {
  try {
    let count = req.query.count ? parseInt(req.query.count) : undefined;

    const books = await prisma.book.findMany({
      take: count,
      orderBy: { id: "asc" },
      include: {
        category: true,
        coverImage: true,
      },
    });

    res.json(books);
  } catch (error) {
    next(error);
  }
};

exports.read = async (req, res) => {
  try {
    let { id } = req.params;

    const books = await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
        coverImage: true,
      },
    });

    res.json(books);
  } catch (error) {
    next(error)
  }
};

exports.update = async (req, res) => {
  try {
    const {
      title,
      author,
      publisher,
      detail,
      pricePerDay,
      coverImage,
      stock,
      categoryId,
    } = req.body;
    const bookId = Number(req.params.id);

    // Check if the book exists
    const existingBook = await prisma.book.findUnique({
      where: { id: bookId },
    });
    if (!existingBook)
      return res.status(404).json({ message: "Book not found" });

    // delete image before update
    if (coverImage) {
      await prisma.coverImage.deleteMany({ where: { bookId } });
    }

    const book = await prisma.book.update({
      where: { id: bookId },
      data: {
        title,
        author,
        publisher,
        detail,
        pricePerDay: parseFloat(pricePerDay),
        stock: parseInt(stock),
        categoryId: parseInt(categoryId),
        coverImage: coverImage ? { create: { url: coverImage } } : undefined,
      },
    });

    res.json({ message: "Book updated successfully", book });
  } catch (error) {
    next(error)
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({ message: "Delete item success" });
  } catch (error) {
    next(error)
  }
};

exports.listBy = async (req, res) => {
  try {
    const { sort = "title", order = "asc", limit = 10 } = req.body; // Default values
    const validOrder = order.toLowerCase() === "desc" ? "desc" : "asc"; // Ensure only "asc" or "desc"

    const books = await prisma.book.findMany({
      take: parseInt(limit, 10),
      orderBy: [{ [sort]: validOrder }],
      include: { category: true },
    });

    res.json(books);
  } catch (error) {
    next(error)
  }
};



const handleQuery = async (req, res, query) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      include: {
        category: true,
        coverImage: true,
      },
    });
    return books; // Return the results
  } catch (err) {
    next(err);
  }
};

const handlePrice = async (req, res, priceRange) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        pricePerDay: {
          gte: priceRange[0],
          lte: priceRange[1],
        },
      },
      include: {
        category: true,
        coverImage: true,
      },
    });
    return books; // Return the results
  } catch (err) {
    next(err);
  }
};

const handleCategory = async (req, res, categoryId) => {
  try {
    const parsedCategoryId = Array.isArray(categoryId)
      ? categoryId.map((id) => Number(id))
      : [Number(categoryId)];

    const books = await prisma.book.findMany({
      where: {
        categoryId: {
          in: parsedCategoryId,
        },
      },
      include: {
        category: true,
        coverImage: true,
      },
    });

    return books; // Return the results
  } catch (err) {
    next(err);
  }
};

exports.searchFilter = async (req, res) => {
  try {
    const { query, category, pricePerDay } = req.body;
    let results = [];

    // Handle query search
    if (query) {
      console.log("query-->", query);
      results = await handleQuery(req, res, query);
    }

    // Handle category filtering
    if (category) {
      console.log("category-->", category);
      results = await handleCategory(req, res, category);
    }

    // Handle price range filtering
    if (pricePerDay) {
      console.log("price-->", pricePerDay);
      results = await handlePrice(req, res, pricePerDay);
    }

    // If no results found after filtering, return a message
    if (Array.isArray(results) && results.length === 0) {
      return res.status(404).json({ message: "No books match the search criteria" });
    }

    res.json(results)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
