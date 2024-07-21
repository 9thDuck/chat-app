import * as mongoose from 'mongoose';
import { seenSchema } from './seen.schema';

export const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    videoUrl: {
      type: String,
      default: '',
    },
    seen: [seenSchema],
  },
  { timestamps: true },
);
