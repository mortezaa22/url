function PageNotFound(req, res, next) {
  const error = Error("Page Not Found");
  error.status = 404;
  next(error);
}
function errorHandler(err, req, res, next) {
  return res.json({
    statuscode: err.status || 500,
    error: { path: err.path, message: err.message || "internal error" },
  });
}
module.exports = {
  PageNotFound,
  errorHandler,
};
