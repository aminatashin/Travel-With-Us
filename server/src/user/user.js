import express from "express";
import userModel from "../model/model.js";
import { generateToken } from "../tools/tools.js";
import { tokenAuth } from "../tools/token.js";
// ========================================
const userRouter = express.Router();
// ========================================
userRouter.post("/signup", async (req, res, next) => {
  try {
    const user = new userModel(req.body);
    const { _id } = await user.save();
    res.send({ _id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// ========================================
userRouter.get("/signup", tokenAuth, async (req, res, next) => {
  try {
    const getUser = await userModel.find();
    res.send(getUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
  const getUser = await userModel();
  res.send(getUser);
});
// userRouter.post("/:userId/favorite", async (req, res, next) => {
//   try {
//     const favorite = new userModel(req.body);
//     const { _id } = await user.save();
//     res.send({ _id });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// ========================================
userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.verify(email, password);
  if (user) {
    const token = await generateToken({
      _id: user._id,
      username: user.username,
    });
    res.send({ token });
  } else res.status(400).send("get Token!");
});
// ========================================
export default userRouter;
