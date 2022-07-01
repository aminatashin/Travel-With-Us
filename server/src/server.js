import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./user/user.js";
import favoriteRouter from "./favorite/favorite.js";
// ==================================
const server = express();
const port = process.env.PORT || 4000;
// ===================================
server.use(cors());
server.use(express.json());
// ===================================
server.use("/user", userRouter);
server.use("/favorite", favoriteRouter);
// ===================================
mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("Mongo is Connected");
  server.listen(port, () => {
    console.log(`Server is connected on port ${port}`);
  });
});
