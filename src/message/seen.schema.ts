import mongoose from 'mongoose';
import { USER_MODEL } from 'src/constants';

export const seenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: USER_MODEL,
  },
  seenAt: {
    type: Date,
    default: Date.now,
  },
});
