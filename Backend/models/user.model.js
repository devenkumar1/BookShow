import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true
    },
    email: {
      type: String,
      unique: true,
      required:true
    },
    password: {
      type: String,
      min: 6,
      required:true
    },
    phonenumber: {
      type: Number,
      default: null
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    profilePic:{
      type:String,
      default:'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    bookedTickets: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "tickets",
        },
      ],
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
export default user;



