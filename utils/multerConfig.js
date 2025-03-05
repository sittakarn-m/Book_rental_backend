const multer = require("multer");

const storage = multer.memoryStorage(); // ใช้ memoryStorage
const upload = multer({ storage: storage });

module.exports = upload;
