import express from "express";
import userModel from "../model/model.js";
import { generateToken } from "../tools/tools.js";
import { tokenAuth } from "../tools/token.js";

// ========================================
const userRouter = express.Router();
// ========================================
userRouter.post("/:id/place", async (req, res, next) => {
  console.log(req.body.fav);
  // const { id } = req.params;
  // const getUser = await userModel.findById(id);
  // console.log(getUser);
  const getUser = await userModel.findById(req.params.id);
  console.log(getUser);
  // const insert = { ...place.toObject(), insertDate: new Date() };
  // const modifiePlace = await userModel(
  //   req.params.id,
  //   {
  //     $push: { place: "" },
  //   },
  //   { new: true, runValidation: true }
  // );
  res.send("gayidi!");
});
// ========================================
userRouter.get("/:id", async (req, res, next) => {
  try {
    const getUser = await userModel.findById(req.params.id);
    res.send(getUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
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
// userRouter.get("/", tokenAuth, async (req, res, next) => {
//   try {
//     const getUser = await userModel.find();
//     res.send(getUser);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
//   const getUser = await userModel();
//   res.send(getUser);
// });
userRouter.get("/signup", tokenAuth, async (req, res, next) => {
  try {
    // const user2 = await userModel.findOne(req.body.email);
    // if (user2) {
    //   return res.status(400).send({ msg: "this email already exists" });
    // } else {
    const getUser = await userModel.find();
    res.send(getUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// ========================================

// ========================================
userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.verify(email, password);
    if (user) {
      const token = await generateToken({
        _id: user._id,
        username: user.username,
      });
      res.send({ token });
    } else res.status(400).send("get Token!");
  } catch (error) {
    console.log(`error${error}`);
    next(error);
  }
});
// ========================================
export default userRouter;
