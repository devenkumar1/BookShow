import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["success", "failed", "pending"],
    required: true,
  },
  method: {
    type: String,
    enum: ["card", "upi", "wallet", "net banking"],
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const payment = mongoose.model("payment", paymentSchema);
export default payment;
