import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const userSchema = new Schema({
  sub: {
    type: String,
    // required: `First Name Required.`
  },
  given_name: {
    type: String,
    required: `First Name Required.`,
  },
  family_name: {
    type: String,
    required: `Last Name Required.`,
  },
  email: {
    type: String,
    required: `Email Address Required.`,
  },
  profilePicUri: {
    type: String,
  },
  favouriteArticles: {
    type: Array,
  },
  savedEnvironments: {
    type: Array,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
