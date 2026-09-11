import express from "express";
import Booking from "../models/Booking.js";
import Shop from "../models/Shop.js";
import Influencer from "../models/Influencer.js";
import {auth} from "../middleware/auth.js";
const r=express.Router();
r.get("/mine",auth,async(req,res)=>{
 let q={};
 if(req.user.role==="owner")q.owner=req.user.id;
 else if(req.user.role==="influencer"){const p=await Influencer.findOne({user:req.user.id});q.influencer=p?._id}
 else return res.json([]);
 res.json(await Booking.find(q).populate("shop","name city images").populate({path:"influencer",populate:{path:"user",select:"name"}}).sort({createdAt:-1}));
});
r.post("/",auth,async(req,res)=>{
 if(req.user.role!=="owner")return res.status(403).json({message:"Only shop owners can create bookings"});
 const s=await Shop.findOne({_id:req.body.shop,owner:req.user.id});
 if(!s)return res.status(403).json({message:"Shop does not belong to this owner"});
 res.status(201).json(await Booking.create({...req.body,owner:req.user.id}));
});
r.patch("/:id/status",auth,async(req,res)=>{
 const b=await Booking.findById(req.params.id).populate("influencer");
 if(!b)return res.status(404).json({message:"Booking not found"});
 if(!["accepted","rejected","completed","cancelled"].includes(req.body.status))return res.status(400).json({message:"Invalid status"});
 const infUser=b.influencer?.user?.toString();
 const ok=(req.user.role==="owner"&&b.owner.toString()===req.user.id)||(req.user.role==="influencer"&&infUser===req.user.id);
 if(!ok)return res.status(403).json({message:"Forbidden"});
 b.status=req.body.status;await b.save();res.json(b);
});
export default r;
