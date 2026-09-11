import mongoose from "mongoose";
const schema=new mongoose.Schema({
 booking:{type:mongoose.Schema.Types.ObjectId,ref:"Booking",required:true},
 reviewer:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
 targetUser:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
 targetShop:{type:mongoose.Schema.Types.ObjectId,ref:"Shop"},
 rating:{type:Number,min:1,max:5,required:true},comment:String
},{timestamps:true});
export default mongoose.model("Review",schema);
