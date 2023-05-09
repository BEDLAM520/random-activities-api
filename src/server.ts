import mongoose from "mongoose";
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

import { ActivityInterface, ActivityModel } from "./models/Activity";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL || "";
const PORT = process.env.PORT || 3000;
const ACTIVITY_ENDPOINT = process.env.ACTIVITY_ENDPOINT || "";

mongoose
  .connect(MONGODB_URL, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.get("/load-activities", async (req, res) => {
  try {
    const data = await getActivities();
    await ActivityModel.deleteMany({});
    await ActivityModel.create(data);
    console.log("loaded new activities");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("failed to load new activities");
  }
});

app.get("/activities", async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    const activities = await ActivityModel.find(query);
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Query failed");
  }
});

async function getActivities(): Promise<ActivityInterface[]> {
  const promises = [];
  for (let i = 0; i < 20; i++) {
    promises.push(getActivity());
  }
  const results: ActivityInterface[] = await Promise.all(promises);
  return results;
}

async function getActivity(): Promise<ActivityInterface> {
  const response = await axios.get<ActivityInterface>(ACTIVITY_ENDPOINT);
  return response.data;
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
