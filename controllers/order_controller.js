const prisma = require("../configs/prismaClient");

// const category = await prisma.category.findMany({
//   orderBy: {
//     id: "asc",
//   },
// });
// res.json(category);

exports.getAllOnOrderRentals = async (req, res) => {
  try {
    const rentals = await prisma.rental.findMany({
      include: {
        user: true,
        book: true,
        order: true,
        BookOnRental: true,
      },
      orderBy: {
        orderId: "asc",
      },
    });

    res.status(200).json(rentals);
  } catch (error) {
    console.error("Get Rentals error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// admin role : sending order
exports.updateStatus = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const { status } = req.body;

    const updated = await prisma.rental.updateMany({
      where: { orderId },
      data: { status },
    });

    res.status(200).json({
      message: `Updated ${updated.count} rental(s) to ${status} for order ID ${orderId}`,
    });
  } catch (error) {
    console.error(" Update Rentals error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
