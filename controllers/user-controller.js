const prisma = require("../configs/prismaClient");

exports.getMe = async (req, res) => {
  try {
    const userId = Number(req.user.id);

    const userInfo = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        orders: {
          select: {
            id: true,
            cartTotal: true,
            orderStatus: true,
            createdAt: true,
            updatedAt: true,
            books: {
              select: {
                id: true,
                count: true,
                price: true,
                book: {
                  select: {
                    id: true,
                    title: true,
                    author: true,
                  },
                },
              },
            },
          },
        },
        rentals: {
          select: {
            id: true,
            rentalDate: true,
            returnDate: true,
            totalPrice: true,
            status: true,
            trackingNumber: true,
            book: {
              select: {
                id: true,
                title: true,
                author: true,
              },
            },
            BookOnRental: {
              select: {
                id: true,
                count: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const { address } = req.body;
    // console.log(address);
    const addressUser = await prisma.user.update({
      where: {
        id: Number(req.user.id),
      },
      data: {
        address: address,
      },
    });
    res.json({ message: "updated success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//////////////////////////////////////////////////

exports.addToCart = async (req, res) => {
  try {
    const { bookId, count } = req.body;
    const userId = req.user.id;

    let cart = await prisma.cart.findFirst({
      where: {
        orderedById: userId,
      },
    });

    // create cart
    if (!cart) {
      cart = await prisma.cart.create({
        data: { orderedById: userId, cartTotal: 0 },
      });
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book || book.stock <= 0) {
      return res.status(404).json({ message: "Book not available" });
    }

    // console.log("Cart ID:", cart.id);
    // console.log("Book IDDDDDD:", bookId, "Count:", count);

    const existingBookOnCart = await prisma.bookOnCart.findFirst({
      where: {
        cartId: cart.id,
        bookId: bookId,
      },
    });

    if (existingBookOnCart) {
      await prisma.bookOnCart.update({
        where: { id: existingBookOnCart.id },
        data: { count: existingBookOnCart.count + count },
      });
    } else {
      await prisma.bookOnCart.create({
        data: {
          bookId,
          cartId: cart.id,
          count,
          price: book.pricePerDay,
        },
      });
    }

    // console.log("BookOnCart:", bookOnCart);

    // update cartTotal
    let resultCartTotal = 0;
    const totalResult = await prisma.bookOnCart.findMany({
      where: { cartId: cart.id },
    });

    for (const item of totalResult) {
      resultCartTotal += item.price * item.count;
    }

    if (cart.cartTotal !== resultCartTotal) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: { cartTotal: resultCartTotal },
      });
    }

    res.status(201).json({ message: "Add book to cart Success!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await prisma.cart.findFirst({
      where: { orderedById: userId },
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });

    console.log("Cart Data:", cart);

    if (!cart || cart.books.length === 0) {
      return res
        .status(404)
        .json({ message: "Cart is empty or no items found" });
    }

    // update cartTotal

    let resultCartTotal = 0;
    const totalResult = await prisma.bookOnCart.findMany({
      where: { cartId: cart.id },
    });

    for (const item of totalResult) {
      resultCartTotal += item.price * item.count;
    }

    if (cart.cartTotal !== resultCartTotal) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: { cartTotal: resultCartTotal },
      });
    }

    res.json(cart);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { bookOnCartId, count } = req.body;

    await prisma.bookOnCart.update({
      where: { id: bookOnCartId },
      data: { count },
    });

    const checkStock = await prisma.bookOnCart.findFirst({
      where: {
        count,
      },
    });
    console.log("Check stock:", checkStock.count);

    if (checkStock.count <= 0) {
      await prisma.bookOnCart.delete({
        where: { id: parseInt(bookOnCartId) },
      });
    }
    res.json({ message: "Updated success !!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    await prisma.bookOnCart.delete({ where: { id: parseInt(itemId) } });

    res.json({ message: "Remove item success !!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("Test userId :", userId);
    const cart = await prisma.cart.findFirst({
      where: { orderedById: userId },
      include: { books: { include: { book: true } } },
    });

    if (!cart || !cart.books.length) {
      return res.status(400).json({ message: "Empty cart" });
    }

    // console.log("Cartttttt:", cart);
    // console.log("Books in Cart:", cart.books);

    // check item in stock
    for (const item of cart.books) {
      if (item.book.stock < item.count) {
        return res.status(400).json({
          message: `Stock not enough for book: ${item.book.title}, in stock : ${item.book.stock}`,
        });
      }
    }

    // Update Stock
    // console.log("Cart books:",cart.books)
    for (const item of cart.books) {
      await prisma.book.update({
        where: { id: item.bookId },
        data: {
          stock: {
            decrement: item.count,
          },
        },
      });
    }

    const order = await prisma.order.create({
      data: {
        orderedById: userId,
        cartTotal: cart.cartTotal,
        books: {
          createMany: {
            data: cart.books.map((item) => ({
              bookId: item.bookId,
              count: item.count,
              price: item.price,
            })),
          },
        },
      },
    });

    // console.log("Order rrrrrrrrrr", order)

    // Clear cart
    await prisma.bookOnCart.deleteMany({ where: { cartId: cart.id } });
    await prisma.cart.update({
      where: { id: cart.id },
      data: { cartTotal: 0 },
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
      where: { orderedById: userId },
      include: { books: { include: { book: true } } },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
