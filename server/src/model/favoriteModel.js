import mongoose from "mongoose";
// ===============================
const { Schema, model } = mongoose;
const favoriteSchema = new Schema(
  {
    location: [],
  },
  { timestamps: true }
);
export default model("location", favoriteSchema);
