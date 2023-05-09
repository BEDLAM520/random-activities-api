import mongoose, { Schema, Document } from "mongoose";

export interface ActivityInterface {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
}

export const ActivityModel = mongoose.model<ActivityInterface & Document>(
  "Activity",
  new Schema({
    activity: String,
    type: String,
    participants: Number,
    price: Number,
    link: String,
    key: String,
    accessibility: Number,
  })
);
