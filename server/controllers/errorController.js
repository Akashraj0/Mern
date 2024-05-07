const sendErrorprod = (req, res, err) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  return res.status(err.statusCode).json({ message: "Something went wrong" });
};

const sendErrorDev = (req, res, err) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    return res.status(err.statusCode).json({ message: "Something went wrong" });
  }
};

const err = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(req, res, err);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorprod(req, res, err);
  }
};

export default err;
