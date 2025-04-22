import mongoose from "mongoose"
export const Connect=async(url)=>{
    try {
        await mongoose.connect(url);
    } catch (error) {
        return error.message
    }
}