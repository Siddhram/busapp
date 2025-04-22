import express from "express";
import userModel from "../models/user.js";
import { verifytoken } from "../middleware/verify.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router=express.Router();
router.post('/resister',async(req,res)=>{
    try {
        const {email,password}=req.body;
         const hashed=await bcrypt.hash(password,10);
         const data={email,password:hashed}
        const user=new userModel(data);

        await user.save();
        
        res.status(200).json({
            message:'user resistered succsessfully',
        })
    } catch (error) {
        res.status(500).json({
            error:'resister internal server error'
        })
    }
})

router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await userModel.findOne({
            email
        });
        
        if (!user) {
            res.status(400).json({
            message:'this token is exchanged'
        })
        }
        const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
     res.status(400).json({
            message:'password is wrong'
        })
}
       const token=jwt.sign({
            _id:user._id
        },process.env.SECREATE)
        res.status(200).json({
            message:'user login succsessfully',
            token
        })
    } catch (error) {
        res.status(500).json({
            error:'resister internal server error'
        })
    }
})

export default router