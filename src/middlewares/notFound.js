const notFoundMiddleware = (req, res, next) => {
  res
    .status(404)
    .json({ message: `request URL : ${req.method}${req.url} was not found` });
};

module.exports = notFoundMiddleware;
