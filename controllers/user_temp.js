const prisma = require("../configs/prismaClient");

exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    const userId = Number(req.user.id);

    // Find cart
    let userCart = await prisma.cart.findFirst({
      // Change const to let
      where: { orderedById: userId },
    });

    // Create cart of no cart
    if (!userCart) {
      userCart = await prisma.cart.create({
        data: { orderedById: userId, cartTotal: 0 },
      });
    }

    // Clear existing bookOnCart
    await prisma.bookOnCart.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    let cartTotal = 0;

    // Add new bookOnCart
    for (const item of cart) {
      // Check if book exists
      const book = await prisma.book.findUnique({
        where: { id: item.bookId },
      });

      if (!book) {
        return res
          .status(400)
          .json({ message: `Book with id ${item.bookId} not found` });
      }

      // Check stock
      if (book.stock < item.count) {
        return res.status(400).json({ message: `${book.title} out of stock` });
      }

      await prisma.bookOnCart.create({
        data: {
          bookId: item.bookId,
          count: item.count,
          price: item.price,
          cartId: userCart.id,
        },
      });

      // total price
      cartTotal += item.price * item.count;
    }

    console.log(cartTotal);

    // Update cart total
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        cartTotal: cartTotal,
      },
    });

    // Books in cart
    const newCart = await prisma.bookOnCart.findMany({
      where: { cartId: userCart.id },
    });

    res.json({ message: "Cart updated", newCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    console.log(userId);
    const userCart = await prisma.cart.findFirst({
      where: { orderedById: userId },
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // total price
    const cartTotal = userCart.cartTotal;
    // console.log(cartTotal)

    // map item
    const cartItem = userCart.books.map((item) => ({
      bookId: item.bookId,
      title: item.book.title,
      price: item.price,
      count: item.count,
      total: item.price * item.count,
    }));

    res.json({ cartItem, cartTotal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const userId = Number(req.user.id);

    const cart = await prisma.cart.findFirst({
      where: { orderedById: parseInt(userId) },
    });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // delete bookOnCart
    await prisma.bookOnCart.deleteMany({ where: { cartId: cart.id } });

    // reset cart
    await prisma.cart.update({
      where: { id: cart.id },
      data: { cartTotal: 0 },
    });

    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

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

exports.saveOrder = async (req, res) => {
  try {
    const userCart = await prisma.cart.findFirst({
      where: {
        orderedById: {
          id: Number(req.user.id),
        },
        include: {
          books: true,
        },
      },
    });

    if (!userCart || userCart.books.lenght === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    console.log("userCart", userCart);

    res.json({ message: "Hello saveOrder" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    res.json({ message: "Hello getOrder" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
