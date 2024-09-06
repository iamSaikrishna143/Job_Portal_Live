class Errorhandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server error";

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err=new Errorhandler(message, 400)
  }

  if(err.code === 11000){
    // const message = `Duplicate ${err.keyValue.name} entered`
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`
    err=new Errorhandler(message, 400)
  }
  
  if (err.name === "JsonwebTokenError") {
    const message = `Json Web Token is Invalid, Try Again`;
    err=new Errorhandler(message, 400)
  }
  
  if (err.name === "TokenExpiredError") {
    const message = `Json web Token is Expired, Login Again`;
    err=new Errorhandler(message, 400)
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default Errorhandler;
