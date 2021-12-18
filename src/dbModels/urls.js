const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: String,
    default: null,
  },
});

const url = mongoose.model("url", urlSchema);

module.exports = url;
