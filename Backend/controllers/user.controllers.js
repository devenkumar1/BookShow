import user from "../models/user.model.js";
import ticket from "../models/ticket.model.js";
import movie from "../models/movie.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "all fields are mandatory" });
  }
  try {
    const olduser = await user.findOne({ email });
    if (!olduser) {
      console.log("user does not exist");
      return res
        .status(500)
        .json({ message: "something went wrong or  account doesn't exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, olduser.password);
    if (!isPasswordMatch) {
      console.log("password not matched");
      return res.status(500).json({ message: "password doesn't match" });
    }
    const JWT_SECRET = process.env.JWT_SECRET;

    const token = jwt.sign({ id: olduser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    const userData = await user.findOne({ email }).select("-password");

    return res
      .cookie("token", token, {
        httpOnly: true,
        // secure: process.env.?NODE_ENV === 'production',
        expiresIn: 30 * 24 * 60 * 60 * 1000,
        sameSite: "Lax",
      })
      .status(200)
      .json({ message: "login succesful", userData, token });
  } catch (error) {
    console.log("error while user login", error);
    res.status(500).json({ message: "something went wrong" });
  }
};
export const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "all fields are mandatory" });
  }
  try {
    let useralreadyExists = await user.findOne({ email });
    if (useralreadyExists) {
      return res.status(400).json({ message: "account already exists" });
    }

    //hashing password with bcrypt
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    const JWT_SECRET = process.env.JWT_SECRET;

    //generating jwt token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    const userData = await user.findOne({ email }).select("-password");

    return res
      .cookie("token", token, {
        httpOnly: true,
        // secure: process.env.?NODE_ENV === 'production',
        expiresIn: 10 * 24 * 60 * 60 * 1000,
        sameSite: "Lax",
      })
      .status(201)
      .json({ userData, token});
  } catch (err) {
    console.log("error while user signup", err);
    res.status(500).json({ message: "something went wrong" });
  }
};
export const userLogout = async (req, res) => {
  try {
    // Set the cookie value to an empty string and expire the cookie immediately
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: 0, // Sets cookie expiration to immediate past time
      sameSite: "Lax", // Make sure SameSite is set for cross-origin requests
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const showTickets = async (req, res) => {
  try {
    const tickets = await ticket.find();
    res.status(200).json({ tickets: tickets });
  } catch (error) {
    console.log("error while showing tickets", error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getUserData = async (req, res) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const providedToken = req.cookies.token;
    if (!providedToken) {
      return res.status(401).json({ message: "unauthorized access" });
    }
    const decoded = jwt.verify(providedToken, JWT_SECRET);
    const userData = await user.findById(decoded.id).select("-password");
    return res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, phonenumber } = req.body;
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken.id);
    const currentUser = await user.findByIdAndUpdate(
      decodedToken.id,
      { name, phonenumber },
      { new: true }
    );
    console.log("user found");
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = await user.findById(decodedToken.id).select("-password");
    console.log("updated user successfully");
    return res.status(200).json({ currentUser, userData});
  } catch (error) {
    console.log("Error occurred in updating user profile", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
//get all movies
export const getAllMovies=async(req,res)=>{
  const movies= await movie.find();
  return res.status(200).json({movies});
}
