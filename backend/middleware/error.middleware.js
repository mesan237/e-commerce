const notFound = (req, res, next) => {
  console.log("bod", req.body);
  const error = new Error(`Not found: -${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" || err.kind === "ObjectId") {
    message = "Ressource not found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV !== "production" ? "cake" : err.stack,
  });
};

export { notFound, errorHandler };
