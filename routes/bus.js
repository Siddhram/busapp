import express from "express";
import busModel from "../models/bus.js";
const router=express.Router();
router.post('/getbus/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const bus=await busModel.findOne({
            _id:id
        })
        res.status(200).json({
            success:true,
            data:bus
        })
    } catch (error) {
          res.status(500).json({
           error:"bus getbus"
        })
    }
});
router.get('/getbus',async(req,res)=>{
    try {
        const bus=await busModel.find()
        res.status(200).json({
            success:true,
            data:bus
        })
    } catch (error) {
          res.status(500).json({
           error:"bus getbus"
        })
    }
});
router.post('/search',async(req,res)=>{
    try {
        const {from,to,date}=req.body;
        const selectdate=new Date(date);
        const startoftheday=new Date(selectdate.setHours(0,0,0,0))
        const endoftheday=new Date(selectdate.setHours(23,59,59,999))
        const buses=await busModel.find({
            from,
            to,
            departureTime:{$gte:startoftheday,$lte:endoftheday}
        })
        console.log(req.body);
        
        res.status(200).json({
            success:true,
            data:buses
        })
    } catch (error) {
          res.status(500).json({
           error:"bus getbus"
        })
    }
});
export default router