module.exports = (req, res, next) => {
  res.status(404).json({ message: "Server not found" });
};
