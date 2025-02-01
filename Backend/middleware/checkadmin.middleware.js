import user from "../models/user.model";

import jwt from 'jsonwebtoken'
const checkAdmin= async(req,res,next)=>{
try {
    //jwt token from user Browser
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    JWT_SECRET=process.env.JWT_SECRET;
    const decoded = jwt.verify(token, JWT_SECRET);
    const userData = await user.findById(decoded._id);
    if (!userData) {
      return res.status(401).json({ message: "User not found" });
    }

    if(userData.role!=="User"){
        return res.send(403).json({message:"unauthorized access"});
    } 
    req.userData = userData;
    next();
} catch (error) {
    console.log("Error in checkAdmin middleware", error);
    return res.status(500).json({ message: "Internal server error" });
}
}