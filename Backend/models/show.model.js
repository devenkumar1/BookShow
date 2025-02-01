import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie",
  },

  theatreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "theatre",
  },
  timeSlot: {
    type: Date,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  totalSeats: {
    type: Number,
    default: 100,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const show = mongoose.model("show", showSchema);
export default show;
