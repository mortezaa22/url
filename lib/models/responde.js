module.exports = (statusCode, data, message, path = "") => {
  return { statusCode: statusCode, message: message, data: data, path: path };
};
