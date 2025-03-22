const express = require("express");
const { list, create, remove, edit } = require("../controllers/category-controller");

const router = express.Router();

// @ENDPOINT http://localhost:8899/category

router.get("/", list);
router.post("/", create);
router.patch("/:id", edit);
router.delete("/:id", remove);

module.exports = router;
