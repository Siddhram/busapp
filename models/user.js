import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    }
})

const userModel=mongoose.model('usermod',userSchema);
export default userModel