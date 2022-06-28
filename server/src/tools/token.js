import { verifyToken } from "./tools.js";
// ====================================
export const tokenAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("you are not authorized!");
  } else {
    try {
      const token = req.params.authorization.splice(" ")[1];
      const payload = await verifyToken(token);

      req.user = {
        _id: payload._id,
        ussrname: payload.username,
      };
      next();
    } catch (error) {
      console.log("wrong user! Token not valid");
      next(error);
    }
  }
};
