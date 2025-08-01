import mongoose from "mongoose";
import validator from "validator";
import authRole from "../utils/authRole.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: [validator.isEmail, "Please provide valid email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password should be 8 characters long"],
      trim: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(authRole),
      default: authRole.USER,
    },
  },
  {
    timestamps: true,
  }
);

// Hashing the password before saving it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods = {
  generateJWT: function () {
    return JWT.sign(
      {
        id: this._id,
        email: this.email,
        role: this.role,
      },
      process.env.SECRET,
      { expiresIn: process.env.EXPIRY }
    );
  },

  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },
};

export default mongoose.model("User", userSchema);