import movie from "../models/movie.model.js";
export const addMovie=async(req,res)=>{
    const {title,description,genere,language,duration,rating,releaseDate,posterUrl}=req.body;
    if(!title || !description || !genere || !language || !duration || !rating || !releaseDate || !posterUrl){
        return res.status(400).json({message:"all fields are mandatory"});
    }
    try {
const newMovie= await movie.create({title,description,genere,language,duration,rating,releaseDate,posterUrl});
console.log("newMovie added");
return res.status(201).json({message:"movie added successfully"});
        
    } catch (error) {
        console.log("something went wrong in adding movie",error);
        return res.status(500).json({message:"adding movie unsuccessful"});
    }
}

export const deleteMovie=async(req,res)=>{
const {id}=req.params;
try {
const selectedMovie=await movie.findByIdAndDelete(id);
    return res.status(200).json({message:"movie deleted successfully"});
} catch (error) {
    console.log("something went wrong in deleting movie",error);
    return res.status(500).json({message:"deleting movie unsuccessful"});
}
}

export const  updateMovie=async(req,res)=>{
    const {id}=req.params;
    const {title,description,genere,language,duration,rating,releaseDate,posterUrl}=req.body;
try {
const selectedMovie= await movie.findByIdAndUpdate(id,{title,description,genere,language,duration,rating,releaseDate,posterUrl},{new:true});
    return res.status(200).json({message:"movie updated successfully"});
    
} catch (error) {
  console.log("something went wrong in updating movie",error);
  return res.status(500).json({message:"updating movie unsuccessful"});  
}
}
