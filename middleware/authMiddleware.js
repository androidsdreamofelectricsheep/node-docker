const protect = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    return res.status(401).json({ status: "failed", message: "unauthorized" });
  }

  req.user = user; // req.session.user 대신  req.user로 할당해서 사용

  next();
};

module.exports = protect;
