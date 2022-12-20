import mongoose from "mongoose";

global.models = global.models || {};

global.models.Watchlist =
  global.models.Watchlist ||
  mongoose.model("Watchlist", {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    poster: { type: String, required: true },
    tagline: { type: String, required: false },
    overview: { type: String, required: false },
    rating: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  });

export default global.models.Watchlist;
