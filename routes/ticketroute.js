import express from "express";
import busModel from "../models/bus.js";
import userModel from "../models/user.js";
import ticketModel from "../models/ticket.js";
import { v4 as uuidv4 } from "uuid";
import { verifytoken } from "../middleware/verify.js";
const router=express.Router();

router.get('/myticket',verifytoken,async(req,res)=>{
    try {
        const userId=req.userId;
        
        const tickets=await ticketModel.find({
            user:userId
        }).populate("bus","busId from to departureTime arrivalTime busType company price").sort({bookedAt:-1})
        res.status(200).json({
            success:true,
            data:tickets
        })
    } catch (error) {
        res.status(500).json({
           error:"ticketroute bookticket"
        })
    }
})
router.post('/book_ticket',verifytoken,async(req,res)=>{
    try {

        const userId=req.userId;
        const {busId,date,seatNümbers}=req.body;
        const bus=await busModel.findOne({
            busId:busId
        })
        console.log(bus,' ',req.body);
        
        if(!bus){
              res.status(400).json({
            message:'ticketroute bookticket'
        })
        }
        
        const unavsets=seatNümbers.filter((seatNum)=> bus.seats?.some((row)=>row?.some((seat)=>seat.seat_id==seatNum&&seat.booked))
        )
        if(unavsets.length>0){
            res.status(400).json({
                error:"some sets are already booked",
                unavailablesets:unavsets
            })
        }

        const total=bus.price*seatNümbers.length
        const tickets=new ticketModel({
            user:userId,
            bus:bus._id,
            date,
            seatNümbers:seatNümbers,
            total_fare:total,
            pnr:uuidv4().slice(0,10).toUpperCase()
        })
                console.log(bus);

        await tickets.save();

        
        bus.seats.forEach((row)=>{
            row?.forEach((seat)=>{
           if(seatNümbers.includes(seat.seat_id)){
            seat.booked=true
           }
            })
        })
        await bus.save();
        res.status(200).json({
            success:true,
            message:"ticket booked succsessfully",
            data:tickets
        })
    } catch (error) {
        res.status(500).json({
           error:"ticketroute bookticket"
        })
    }
})
export default router