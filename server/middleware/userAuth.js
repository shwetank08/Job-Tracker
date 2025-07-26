import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    console.log("cookies in mid", req.cookies);
    

    if (!token) {
      return res.status(403).json({ message: "user not logged in" });
    }

    const decode = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById(decode._id, "name email role");

    next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: "server side error middleware", details: err.details });
  }
};
export const isAdmin = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);    

    if (!token) {
      return res.status(403).json({ message: "user not logged in" });
    }

    const decode = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById(decode._id, "name email role");

    if(req.user?.role != "ADMIN"){
        res.status(400).json({message: "Not authorized to access this route"})
    }

    next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Not authorized to access this route" });
  }
};
