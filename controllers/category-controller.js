const prisma = require("../configs/prismaClient");

exports.create = async (req, res) => {
  try {
    const { id, name } = req.body;
    const category = await prisma.category.create({
      data: {
        id,
        name,
      },
    });
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.list = async (req, res) => {
  try {
    const category = await prisma.category.findMany({
      orderBy: {
        id: "asc",
      },
    });
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Remove category success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.edit = async (req, res) => {
  try {
    const { id } = req.params; // รับ id จาก URL
    const { name } = req.body; // รับ name ที่ต้องการอัปเดต

    const category = await prisma.category.update({
      where: {
        id: Number(id), // แปลง id เป็น Number
      },
      data: {
        name, // อัปเดต name
      },
    });

    res.json(category); // ส่งข้อมูลกลับ
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
