import express from "express";
import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import {auth} from "../middleware/auth.js";
const r=express.Router();
r.get("/",async(req,res)=>{
 const q={};if(req.query.shop)q.targetShop=req.query.shop;if(req.query.user)q.targetUser=req.query.user;
 res.json(await Review.find(q).populate("reviewer","name").sort({createdAt:-1}));
});
r.post("/",auth,async(req,res)=>{
 const b=await Booking.findById(req.body.booking).populate("shop influencer");
 if(!b||b.status!=="completed")return res.status(400).json({message:"Only completed bookings can be reviewed"});
 const x=await Review.create({booking:b._id,reviewer:req.user.id,rating:req.body.rating,comment:req.body.comment,targetShop:req.user.role==="influencer"?b.shop._id:undefined,targetUser:req.user.role==="owner"?b.influencer.user:undefined});
 res.status(201).json(x);
});
export default r;
