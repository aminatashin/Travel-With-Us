import express from "express";
import userModel from "../model/model.js";
import { generateToken } from "../tools/tools.js";
import { tokenAuth } from "../tools/token.js";

// ========================================
const userRouter = express.Router();
// ========================================
userRouter.post("/place/:id", async (req, res, next) => {
  const { id: _id } = req.params;
  const data = req.body;
  const modifiePlace = await userModel.findByIdAndUpdate(
    _id,
    {
      $push: { place: data.fav },
    },
    { new: true, runValidation: true }
  );
  res.json(modifiePlace);
});
// ========================================
userRouter.get("/place/:id", async (req, res, next) => {
  try {
    const getUser = await userModel.findById(req.params.id);
    console.log;
    res.send(getUser.place);
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
userRouter.get("/signup", async (req, res, next) => {
  try {
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
