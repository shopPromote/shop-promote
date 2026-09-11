import mongoose from "mongoose";
const schema=new mongoose.Schema({
 owner:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
 name:{type:String,required:true,trim:true},category:{type:String,required:true},
 description:String,city:String,address:String,phone:String,images:[String],website:String,
 verified:{type:Boolean,default:false},rating:{type:Number,default:0},reviewCount:{type:Number,default:0}
},{timestamps:true});
export default mongoose.model("Shop",schema);
