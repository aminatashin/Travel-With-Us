import express from "express";
import favoriteModel from "../model/favoriteModel.js";
// ====================================================
const favoriteRouter = express.Router();
favoriteRouter.post("/", async (req, res, next) => {
  const fav = new favoriteModel(req.body.location_id);
  const { _id } = await fav.save();
  res.send({ _id });
});
favoriteRouter.get("/", async (req, res, next) => {
  const loc = await favoriteModel.find();
  res.send(loc);
});
favoriteRouter.delete("/", async (req, res, send) => {
  const deleteFav = await favoriteModel.findOneAndDelete();
  res.send();
});
export default favoriteRouter;
