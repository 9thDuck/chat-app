import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, `Name is required`],
    },
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: [true, `Email is required`],
      unique: true,
    },
    password: {
      type: String,
      required: [true, `Password is required`],
    },
    profile_pic: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);
