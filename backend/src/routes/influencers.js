import express from "express";
import Influencer from "../models/Influencer.js";
import {auth,role} from "../middleware/auth.js";
const r=express.Router();
r.get("/",async(req,res)=>{
 const q={available:true};
 if(req.query.niche)q.niche=new RegExp(req.query.niche,"i");
 if(req.query.city)q.city=new RegExp(req.query.city,"i");
 if(req.query.search)q.$or=[{bio:new RegExp(req.query.search,"i")},{niche:new RegExp(req.query.search,"i")}];
 res.json(await Influencer.find(q).populate("user","name").sort({rating:-1,followers:-1}));
});
r.get("/:id",async(req,res)=>{
 const x=await Influencer.findById(req.params.id).populate("user","name email");
 if(!x)return res.status(404).json({message:"Influencer not found"});res.json(x);
});
r.post("/profile",auth,role("influencer"),async(req,res)=>res.json(await Influencer.findOneAndUpdate({user:req.user.id},{...req.body,user:req.user.id},{upsert:true,new:true})));
export default r;
