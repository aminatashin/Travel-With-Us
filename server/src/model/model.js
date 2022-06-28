import mongoose from "mongoose";
import bcrypt from "bcrypt";
//
const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
// ====================================
userSchema.pre("save", async function (next) {
  const user = this;
  const password = this.password;
  const hash = await bcrypt.hash(password, 11);
  user.password = hash;
  next();
});
// ====================================
userSchema.methods.toJSON = function () {
  const userDocument = this;
  const userObject = userDocument.toObject();

  delete userObject.password;
  delete userObject.__v;

  return userObject;
};
// ====================================
userSchema.static("verify", async function (email, password) {
  const user = await this.find(email);
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
});
// ====================================
export default model("user", userSchema);
