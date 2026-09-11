import mongoose from "mongoose";
const schema=new mongoose.Schema({
 shop:{type:mongoose.Schema.Types.ObjectId,ref:"Shop",required:true},
 influencer:{type:mongoose.Schema.Types.ObjectId,ref:"Influencer",required:true},
 owner:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
 campaignType:{type:String,enum:["instagram_post","instagram_reel","youtube_video","other"],required:true},
 message:String,budget:{type:Number,default:0},
 status:{type:String,enum:["pending","accepted","rejected","completed","cancelled"],default:"pending"},
 scheduledAt:Date,createdAt:{type:Date,default:Date.now}
});
export default mongoose.model("Booking",schema);
