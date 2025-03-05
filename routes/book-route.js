const express = require("express");
const router = express.Router();
const {
  create,
  list,
  remove,
  listBy,
  searchFilter,
  update,
  read,
} = require("../controllers/book-controller");
const { adminCheck, authCheck } = require("../middlewares/auth-middleware");
const upload = require("../utils/multerConfig");

// @ENDPOINT http://localhost:8899/book
router.post("/", upload.single("coverImage"), create); // create product
router.get("/list/", list); // Use query param (?count=10)
router.put("/:id", update); // update product by id
router.get("/:id", read); // get book by id
router.delete("/:id", remove); // delete product
router.post("/product-by", listBy); // desc adsc
router.post("/search/filters", searchFilter); // search

module.exports = router;
