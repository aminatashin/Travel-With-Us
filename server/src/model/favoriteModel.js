import mongoose from "mongoose";
// ===============================
const { Schema, model } = mongoose;
const favoriteSchema = new Schema(
  {
    location: [{ location: String }],
  },
  { timestamps: true }
);
export default model("favorite", favoriteSchema);
