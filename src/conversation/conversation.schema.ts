import mongoose, { Schema } from 'mongoose';
import { MESSAGE_MODEL, USER_MODEL } from 'src/constants';

export const conversationSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: USER_MODEL,
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: USER_MODEL,
    },
    messages: [{ type: mongoose.Schema.ObjectId, ref: MESSAGE_MODEL }],
  },
  { timestamps: true },
);
