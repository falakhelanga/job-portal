export const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: error.message,
  });
};

export const pageNotFoundHandler = (req, res, next) => {
  const error = new Error("page not found");

  res.status(404);

  next(error);
};
