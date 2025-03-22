module.exports = (req, res, next) => {
  // เช็คว่ากำลัง Dev หรือ Test อยู่ไหม
  const devMode = true; // เปลี่ยนเป็น false ตอน Production

  if (devMode) {
    // Mock user id
    req.user = { id: 1 };
  }

  next();
};
