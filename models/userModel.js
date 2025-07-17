import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
dotenv.config();

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createJWT = function () {
  return JWT.sign(
		{ userId : this._id},
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	)
};

const User = mongoose.model("User", userSchema);
export default User;
