import show from "../models/show.model.js";

export const addShow = async (req, res) => {
  const {movieId,theatreId,timeSlot,availableSeats,price}=req.body;
  if(!movieId||!theatreId||!timeSlot||!availableSeats||!price){
    return res.status(400).json({message:"all fields are mandatory"});
  }
 try{ const newShow= await show.create({movieId,theatreId,timeSlot,availableSeats,price});
  return res.status(201).json({message:"show added successfully"});
  }catch(error){
    console.log("something went wrong in adding show",error);
    return res.status(500).json({message:"adding show unsuccessful"});
  }
};


export const updateShow=async(req,res)=>{
  const {id}=req.params;
  const {movieId,theatreId,timeSlot,availableSeats,price}=req.body;
  try{
    const selectedShow= await show.findByIdAndUpdate(id,{movieId,theatreId,timeSlot,availableSeats,price},{new:true});
    return res.status(200).json({message:"show updated successfully"});
  }catch(error){
    console.log("something went wrong in updating show",error);
    return res.status(500).json({message:"updating show unsuccessful"});
  }

}


export const deleteShow=async(req,res)=>{
  const {id}=req.params;
  try{
    const selectedShow=await show.findByIdAndDelete(id);
    return res.status(200).json({message:"show deleted successfully"});
  }catch(error){
    console.log("something went wrong in deleting show",error);
    return res.status(500).json({message:"deleting show unsuccessful"});
  }

}