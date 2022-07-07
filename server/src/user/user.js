import express from "express";
import userModel from "../model/model.js";
import { generateToken } from "../tools/tools.js";
import { tokenAuth } from "../tools/token.js";
import favoriteModel from "../model/favoriteModel.js";
// ========================================
const userRouter = express.Router();
// ========================================
userRouter.post("/place", tokenAuth, async (req, res, next) => {
  const places = await favoriteModel.findById(req.body.location_id, { _id: 0 });
  const placeInsert = { ...places.toObject(), purchaseDate: new Date() };
  const modifiePlace = await userModel(
    req.user._id,
    {
      $push: { place: placeInsert },
    },
    { new: true, runValidation: true }
  );
  res.send(modifiePlace);
});
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
    const user2 = await userModel.findOne(req.body.email);
    if (user2) {
      return res.status(400).send({ msg: "this email already exists" });
    } else {
      const getUser = await userModel.find();
      res.send(getUser);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

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
