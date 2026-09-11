import mongoose from "mongoose";
const schema=new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:"User",unique:true,required:true},
 bio:String,niche:String,city:String,avatar:String,followers:{type:Number,default:0},
 engagementRate:{type:Number,default:0},
 platforms:[{name:String,handle:String,followers:Number}],
 rates:{instagramPost:{type:Number,default:0},instagramReel:{type:Number,default:0},youtubeVideo:{type:Number,default:0},other:{type:Number,default:0}},
 rating:{type:Number,default:0},reviewCount:{type:Number,default:0},available:{type:Boolean,default:true}
},{timestamps:true});
export default mongoose.model("Influencer",schema);
