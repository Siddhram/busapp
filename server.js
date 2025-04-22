import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Connect } from './config/connext.js';
import resisterrouter from './routes/resister.js';
import busrouter from './routes/bus.js'
import ticketrouter from './routes/ticketroute.js'
import busModel from './models/bus.js';
dotenv.config()
const app=express();
app.use(cors());
app.use(express.json());
Connect(process.env.MONGO).then(()=>{
    console.log('connected db');
    
})
app.use('/me',resisterrouter);
app.use('/bus',busrouter);
app.use('/ticket',ticketrouter);

app.post('/addbusces',async(req,res)=>{
    try {
            const {
      busId,
      from,
      to,
      departureTime,
      arrivalTime,
      duration,
      availableSeats,
      price,
      originalPrice,
      company,
      busType,
      badges,
      seats
    } = req.body;

    const newBus = new busModel({
      busId,
      from,
      to,
      departureTime,
      arrivalTime,
      duration,
      availableSeats,
      price,
      originalPrice,
      company,
      busType,
      badges,
      seats,   // 🪑 This should be an array of arrays of seats
    });

    await newBus.save();

    res.status(201).json({
      success: true,
      message: "Bus added successfully 🚍",
      data: newBus,
    });
        
    } catch (error) {
        res.status(500).json({
            error:"add bus failed"
        })
    }
})
app.listen(3000,()=>{
    console.log('server on');
})