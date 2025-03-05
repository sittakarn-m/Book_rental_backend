const prisma = require("../configs/prismaClient");

exports.listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        enabled: true,
      },
    });
    res.json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id, enabled } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { enabled: Boolean(enabled) },
    });
    res.json({ message: "Update status success", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.changeRole = async (req, res) => {
  try {
    const { id, role } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { role: role.toUpperCase() },
    });
    res.json({ message: "Hello change role success",user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


