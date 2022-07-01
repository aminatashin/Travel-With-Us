import express from "express";
import favoriteModel from "../model/favoriteModel.js";
// ====================================================
const favoriteRouter = express.Router();
favoriteRouter.post("/", async (req, res, next) => {
  const favorite = new favoriteModel(req.body);
  const { _id } = await favorite.save();
  res.send({ _id });
});
favoriteRouter.get("/", async (req, res, next) => {
  const getFavorite = await favoriteModel.find();

  res.send(getFavorite);
});
export default favoriteRouter;
