import mongoose from "mongoose";

const ticketScheme=mongoose.Schema({
user: { type:mongoose.Schema.Types.ObjectId, ref: "usermod", required: true },

bus: { type:mongoose.Schema.Types.ObjectId, ref: "busmod", required: true },

date:{type: Date, required: true},

seatNümbers: [{ type: Number, required: true }],

total_fare: { type: Number, required: true },

status: {

type: String,

enum: ["Upcoming", "Completed", "Cancelled"],

default: "Upcoming",

},
bookedAt:{type:Date,default:Date.now},
pnr:{type:String,unique:true,required:true}
})

const ticketModel=mongoose.model('ticketmod',ticketScheme);
export default ticketModel