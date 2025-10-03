import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler("Unauthorized User", 403));
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};
export const isAuthorizedRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
