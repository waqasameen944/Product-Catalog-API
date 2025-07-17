import JWT from "jsonwebtoken";
import Errorhandler from "../utils/errorHandler";
import dotenv from "dotenv";
dotenv.config();

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader && authHeader.startWith("Bearer ")) {
      return next(new Errorhandler("Unauthorized", 401));
    }

    const token = authHeader.split(" ")[1];

    const payload = JWT.verify(token, process.env.JWT_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

export default authUser;
